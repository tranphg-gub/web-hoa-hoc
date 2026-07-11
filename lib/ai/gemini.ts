import { GoogleGenerativeAI, type ResponseSchema } from "@google/generative-ai";

export function getGeminiModel(systemInstruction: string, modelName?: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Chưa cấu hình GEMINI_API_KEY trên server.");
  }
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client.getGenerativeModel({
    model: modelName || process.env.GEMINI_MODEL || "gemini-flash-latest",
    systemInstruction,
  });
}

// Model rẻ, quota free tier cao — dùng cho soạn/kiểm chứng câu hỏi hàng loạt
// (2.5-pro free tier chỉ ~vài chục request/ngày, không đủ cho batch).
export function getGenerationModelName() {
  return process.env.GEMINI_GENERATE_MODEL || "gemini-flash-latest";
}

export async function askGeminiOnce(systemInstruction: string, message: string) {
  const model = getGeminiModel(systemInstruction);
  const result = await model.generateContent(message);
  return result.response.text();
}

// Ép Gemini trả về JSON đúng schema thay vì tự parse text bằng regex (dễ vỡ).
export async function askGeminiJson<T>(
  systemInstruction: string,
  message: string,
  schema: ResponseSchema,
  modelName?: string
): Promise<T> {
  const model = getGeminiModel(systemInstruction, modelName);
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: message }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  const text = result.response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("AI trả về định dạng không hợp lệ, vui lòng thử lại.");
  }
}
