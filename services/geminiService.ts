import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "API Key not configured. Please check environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are the Legal Assistant for 'FreeTube CC Downloader'. 
        Your goal is to educate users about Creative Commons licenses and why downloading copyrighted content is illegal.
        Keep your answers concise, friendly, and informative.
        If a user asks how to download a copyrighted video, politely explain that this tool restricts that functionality for legal reasons.
        Explain the difference between 'Standard YouTube License' and 'Creative Commons Attribution'.`,
      }
    });
    
    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the legal knowledge base right now.";
  }
};
