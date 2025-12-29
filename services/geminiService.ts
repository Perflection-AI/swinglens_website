import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { CoachResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey });

export const getGolfAdvice = async (query: string): Promise<CoachResponse> => {
  if (!apiKey) {
    // Simulate a response if no API key is present for demo purposes (fallback)
    // In a real production app, we would throw an error or handle this upstream.
    console.warn("No API Key found. Returning mock data.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          advice: "It sounds like you might be coming over the top. Try to keep your back to the target a bit longer in the downswing to shallow out the club.",
          drill: "Place a headcover under your right armpit (for righties) and keep it there while you swing to promote connection."
        });
      }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I am a golfer asking for advice. My problem is: "${query}". Provide specific, professional golf advice and a training drill.`,
      config: {
        systemInstruction: "You are a world-class PGA golf coach. Your advice should be concise, encouraging, and actionable. Avoid jargon where possible, or explain it. Return the response in JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: {
              type: Type.STRING,
              description: "The technical advice for the golfer.",
            },
            drill: {
              type: Type.STRING,
              description: "A specific drill to practice.",
            },
          },
          required: ["advice", "drill"],
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as CoachResponse;

  } catch (error) {
    console.error("Error fetching golf advice:", error);
    throw error;
  }
};