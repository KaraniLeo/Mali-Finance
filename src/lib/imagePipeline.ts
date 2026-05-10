import { LearningCard } from "../types/curriculum";

export function generateImagePrompt(card: LearningCard): string {
  // Use a combination of title, type, and content to build a descriptive prompt
  const baseDescription = card.content.substring(0, 100).replace(/\n/g, ' ');
  return `A clean, modern, minimalistic illustration of ${card.title} - ${card.type}. Concept: ${baseDescription}. Dark theme, fintech UI style, highly detailed, cinematic lighting.`;
}

export async function generateCardImage(card: LearningCard): Promise<string> {
  const prompt = generateImagePrompt(card);
  
  // 1. Try DALL-E 3 API (if OPENAI_API_KEY is available)
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024"
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0 && data.data[0].url) {
          return data.data[0].url;
        }
      } else {
        console.warn("OpenAI API failed, falling back to Unsplash...", await response.text());
      }
    } catch (error) {
      console.warn("Error calling OpenAI API, falling back to Unsplash...", error);
    }
  }

  // 2. Fallback to Unsplash API
  if (process.env.UNSPLASH_API_KEY) {
    try {
      // Use the card title as the keyword for unsplash search
      const keyword = encodeURIComponent(card.title);
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${keyword}&client_id=${process.env.UNSPLASH_API_KEY}&orientation=landscape`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.urls && data.urls.regular) {
          return data.urls.regular;
        }
      } else {
        console.warn("Unsplash API failed", await response.text());
      }
    } catch (error) {
      console.warn("Error calling Unsplash API", error);
    }
  }

  // 3. Ultimate Fallback (placeholder image)
  const fallbacks = [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', // trading charts
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80', // money abstract
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80', // digital network
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80', // stock market
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // modern tech abstract
  ];
  
  // Deterministic pick based on card title/id length
  const index = (card.title.length + card.id.length) % fallbacks.length;
  return fallbacks[index];
}
