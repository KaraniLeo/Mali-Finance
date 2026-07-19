import { supabase } from './supabase';

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

export interface MaliResponse {
  text: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  model?: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function generateMaliResponse(prompt: string, context: any, history: ChatMessage[]): Promise<MaliResponse & { error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { prompt, context, history }
    });

    if (error) {
      console.error('Error invoking chat function:', error);
      if (error.message?.includes('402') || (error as any).status === 402 || (error as any).statusCode === 402) {
        return {
          text: "You have exhausted your 5 free chatbot requests. Please pay KES 300 to get unlimited access.",
          error: 'payment_required'
        };
      }
      throw error;
    }

    return {
      text: data.text,
      usage: data.usage,
      model: data.model,
    };
  } catch (error: any) {
    console.error('Failed to generate response:', error);
    if (error.message?.includes('402') || error.status === 402 || error.statusCode === 402 || (error?.context?.status === 402)) {
      return {
        text: "You have exhausted your 5 free chatbot requests. Please pay KES 300 to get unlimited access.",
        error: 'payment_required'
      };
    }
    return {
      text: "Oops! My connection to the knowledge base just glitched. 🏦\n\n**Admin Notice:** If you haven't deployed the Edge Function yet, I can't connect to the AI! Please check the Walkthrough Document for instructions on how to set up my brain using `npx supabase secrets set OPENAI_API_KEY=...` and deploy my Edge Function.",
    };
  }
}

function estimateTokensFromText(text: string) {
  return Math.max(1, Math.ceil(text.length / 4));
}

export async function streamMaliResponse(
  prompt: string,
  context: any,
  history: ChatMessage[],
  onPartial: (text: string, estimatedTokens: number) => void,
  onComplete?: (result: MaliResponse) => void,
): Promise<MaliResponse> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase client configuration');
  }

  const functionUrl = `${SUPABASE_URL}/functions/v1/chat?stream=true`;
  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ prompt, context, history, stream: true }),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text();
    throw new Error(`Streaming chat failed: ${response.status} ${errorText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let streamBuffer = '';
  let reply = '';
  let finalUsage: MaliResponse['usage'] | undefined = undefined;
  let finalModel: string | undefined = undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    streamBuffer += decoder.decode(value, { stream: true });

    let boundaryIndex;
    while ((boundaryIndex = streamBuffer.indexOf('\n\n')) !== -1) {
      const chunk = streamBuffer.slice(0, boundaryIndex).trim();
      streamBuffer = streamBuffer.slice(boundaryIndex + 2);

      if (!chunk) continue;
      const lines = chunk.split('\n');

      for (const line of lines) {
        let payload = line.trim();
        if (payload.startsWith('data:')) {
          payload = payload.replace(/^data:\s*/, '');
        } else if (!payload.startsWith('{')) {
          continue;
        }

        if (payload === '[DONE]') {
          const result = { text: reply, usage: finalUsage, model: finalModel };
          if (onComplete) onComplete(result);
          return result;
        }

        try {
          const parsed = JSON.parse(payload);
          finalUsage = parsed.usage ?? finalUsage;
          finalModel = parsed.model ?? finalModel;
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            reply += delta;
            const estimated = estimateTokensFromText(reply);
            onPartial(reply, estimated);
          } else if (parsed.text) {
            reply = parsed.text;
            const estimated = estimateTokensFromText(reply);
            onPartial(reply, estimated);
          }
        } catch (parseError) {
          console.error('Failed to parse stream payload', parseError, payload);
        }
      }
    }
  }

  // Fallback: If no chunks were parsed but we received data, parse the entire buffer
  if (!reply && streamBuffer.trim()) {
    try {
      let payload = streamBuffer.trim();
      if (payload.startsWith('data:')) {
        payload = payload.replace(/^data:\s*/, '');
      }
      if (payload.startsWith('{')) {
        const parsed = JSON.parse(payload);
        reply = parsed.text || parsed.choices?.[0]?.message?.content || parsed.choices?.[0]?.delta?.content || '';
        finalUsage = parsed.usage || finalUsage;
        finalModel = parsed.model || finalModel;
        const estimated = estimateTokensFromText(reply);
        onPartial(reply, estimated);
      }
    } catch (e) {
      console.error("Failed to parse end-of-stream buffer fallback:", e);
    }
  }

  const result = { text: reply, usage: finalUsage, model: finalModel };
  if (onComplete) onComplete(result);
  return result;
}
