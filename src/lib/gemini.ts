import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const getModel = (modelName: string = 'gemini-1.5-flash'): GenerativeModel => {
  return genAI.getGenerativeModel({ model: modelName });
};

/**
 * Utility to call Gemini with automatic retries and exponential backoff
 */
export async function generateWithRetry(
  prompt: string,
  modelName: string = 'gemini-1.5-flash',
  maxRetries: number = 3
) {
  const model = getModel(modelName);
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      lastError = error;
      const message = error.message || '';
      
      // If it's a rate limit (429) or server error (500, 503, 504), retry
      if (message.includes('429') || message.includes('quota') || message.includes('500') || message.includes('503') || message.includes('504')) {
        const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
        console.warn(`Gemini API error (retry ${i + 1}/${maxRetries}): ${message}. Retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // For other errors, throw immediately
      throw error;
    }
  }

  throw lastError;
}
