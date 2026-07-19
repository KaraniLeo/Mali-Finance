import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { prompt, context, history, stream } = await req.json();

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    // Set up Supabase Client to check payment status and count messages
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (supabaseUrl && supabaseAnonKey) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Missing Authorization header' }),
          { status: 401, headers: corsHeaders }
        );
      }

      const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });

      // Verify user JWT token
      const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
      if (authError || !user) {
        console.error('Auth verification failed:', authError);
        return new Response(
          JSON.stringify({ error: 'Invalid user token' }),
          { status: 401, headers: corsHeaders }
        );
      }

      const userId = user.id;

      // Use service role client to fetch profile and messages securely
      const supabaseService = createClient(
        supabaseUrl,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || supabaseAnonKey
      );

      // Check payment status and chat count
      const { data: profile, error: profileError } = await supabaseService
        .from('profiles')
        .select('chatbot_paid, chat_count')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Failed to fetch user profile:', profileError);
      }

      const isPaid = profile?.chatbot_paid === true;
      const chatCount = Number(profile?.chat_count || 0);

      if (!isPaid) {
        if (chatCount >= 5) {
          return new Response(
            JSON.stringify({
              error: 'payment_required',
              message: 'You have exhausted your 5 free chatbot requests. Please pay KES 300 to unlock unlimited access.',
              count: chatCount
            }),
            { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Increment chat_count in profiles
        const { error: updateError } = await supabaseService
          .from('profiles')
          .update({ chat_count: chatCount + 1 })
          .eq('id', userId);

        if (updateError) {
          console.error('Failed to increment user chat_count:', updateError);
        }
      }
    }

    // Personality & System Prompt
    const systemPrompt = `You are MaliBot (or just Mali), a highly educational financial tutor for young people in Kenya.
Always:
- Use simple language
- Give examples and use stories
- Encourage learning
- Use emojis to be engaging
- Ask follow-up questions to test their understanding

Never:
- Give actual financial advice
- Recommend risky investments

User Context (Age, Progress, etc):
${JSON.stringify(context, null, 2)}
`;

    // Format history for OpenAI API
    const messages = [];
    
    // 1. System Prompt
    messages.push({ role: 'system', content: systemPrompt });

    // 2. Chat History
    if (history && history.length > 0) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      }
    }
    
    // 3. Current Prompt
    messages.push({
      role: 'user',
      content: prompt
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1500,
        ...(stream ? { stream: true } : {})
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      throw new Error(`OpenAI API returned ${response.status}: ${errorText}`);
    }

    if (stream) {
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
        status: 200,
      });
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || "I'm having trouble thinking right now. Try again later!";

    return new Response(
      JSON.stringify({ text: replyText, usage: data.usage, model: data.model }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (err) {
    const error = err as any;
    console.error('Error in chat edge function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
