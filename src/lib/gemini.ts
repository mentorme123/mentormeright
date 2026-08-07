import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
if (!apiKey) {
  console.error('FATAL: GEMINI_API_KEY is not defined in environment variables!');
} else {
  console.log(`Gemini API Key detected (starts with: ${apiKey.substring(0, 6)}...)`);
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getModel = (modelName: string = 'gemini-1.5-flash'): GenerativeModel => {
  // v1beta supports the latest and experimental models reliably.
  return genAI.getGenerativeModel(
    { model: modelName },
    { apiVersion: 'v1beta' }
  );
};

/**
 * Utility to call Gemini with automatic retries, exponential backoff, and model fallback
 */
export async function generateWithRetry(
  prompt: string,
  modelName: string = 'gemini-1.5-flash',
  maxRetries: number = 5
) {
  let lastError: any;
  const modelsToTry = [
    modelName,
    'gemini-3.5-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash',
    'gemini-2.0-flash'
  ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing or undefined. Please ensure it is set in your environment variables (Vercel/Local).');
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // Alternate models on persistent failure to find one with available quota
    const currentModelName = modelsToTry[attempt % modelsToTry.length];
    console.log(`Attempting generation with model: ${currentModelName} (attempt ${attempt + 1})`);
    
    try {
      const model = getModel(currentModelName);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      lastError = error;
      const message = error.message || '';
      
      // If model not found (404), try the next one immediately
      if (message.includes('404') || message.includes('not found')) {
        console.warn(`Model ${currentModelName} not found. Trying next...`);
        continue; 
      }

      // If it's a rate limit (429), server error (500, 503, 504), or high traffic
      if (
        message.includes('429') || 
        message.includes('quota') || 
        message.includes('exhausted') ||
        message.includes('500') || 
        message.includes('503') || 
        message.includes('504') ||
        message.includes('overloaded')
      ) {
        // Exponential backoff: 2s, 4s, 8s, 16s... plus jitter
        const delay = Math.pow(2, attempt + 1) * 1000 + Math.random() * 2000;
        console.warn(`Gemini API ${currentModelName} error (attempt ${attempt + 1}/${maxRetries}): ${message}. Retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // For other errors (like invalid prompt), throw immediately
      throw error;
    }
  }

  throw lastError;
}
