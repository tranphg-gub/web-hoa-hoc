import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGeminiModel(systemInstruction: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Chưa cấu hình GEMINI_API_KEY trên server.");
  }
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-pro",
    systemInstruction,
  });
}

export async function askGeminiOnce(systemInstruction: string, message: string) {
  const model = getGeminiModel(systemInstruction);
  const result = await model.generateContent(message);
  return result.response.text();
}
