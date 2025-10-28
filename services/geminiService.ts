import { GoogleGenAI, Type } from "@google/genai";
import { EmotionAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const emotionSchema = {
  type: Type.OBJECT,
  properties: {
    happy: { type: Type.NUMBER, description: "Confidence score for happiness" },
    sad: { type: Type.NUMBER, description: "Confidence score for sadness" },
    angry: { type: Type.NUMBER, description: "Confidence score for anger" },
    neutral: { type: Type.NUMBER, description: "Confidence score for neutrality" },
    surprised: { type: Type.NUMBER, description: "Confidence score for surprise" },
    fearful: { type: Type.NUMBER, description: "Confidence score for fear" },
    disgusted: { type: Type.NUMBER, description: "Confidence score for disgust" },
  },
  required: ['happy', 'sad', 'angry', 'neutral', 'surprised', 'fearful', 'disgusted'],
};

export const analyzeEmotionFromAudio = async (base64Audio: string, mimeType: string): Promise<EmotionAnalysis> => {
  try {
    const prompt = `
      Analyze the emotion of the speaker in the provided audio.
      Respond with a JSON object containing confidence scores (from 0.0 to 1.0) for the following emotions:
      happy, sad, angry, neutral, surprised, fearful, disgusted.
      The scores should represent the likelihood of each emotion being present.
    `;

    const audioPart = {
      inlineData: {
        data: base64Audio,
        mimeType: mimeType,
      },
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [ {text: prompt}, audioPart ] },
        config: {
            responseMimeType: "application/json",
            responseSchema: emotionSchema,
        },
    });
    
    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    return parsedJson as EmotionAnalysis;

  } catch (error) {
    console.error("Error analyzing emotion:", error);
    throw new Error("Failed to analyze emotion from audio. Please try again.");
  }
};

// FIX: Added generateExplanation function to provide grammar explanations using Gemini.
export const generateExplanation = async (sentence: string): Promise<string> => {
  try {
    const prompt = `
      You are an expert Spanish grammar teacher.
      A user has provided the following sentence: "${sentence}"
      This sentence uses either "ser" or "estar".
      1. Identify which verb is used ("ser" or "estar").
      2. Explain concisely why that verb is the correct choice in this context, referencing the specific grammar rule (e.g., Description, Origin, Location, Condition, etc.).
      3. Provide a simple English translation of the sentence.
      Keep your explanation clear, friendly, and easy for a beginner to understand. Use markdown for formatting (like **bold** for key terms).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating explanation:", error);
    throw new Error("Failed to generate explanation. Please try again.");
  }
};
