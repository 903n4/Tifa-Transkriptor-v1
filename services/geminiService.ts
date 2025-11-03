
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

const PROMPT = `Please extract the full text. Please arrange it in paragraph form. Identify each speaker. And every time there is a new speaker, add a timestamp next to the speaker's name.`;

export const transcribeAudio = async (file: File): Promise<string> => {
  const audioBase64 = await fileToBase64(file);

  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: file.type,
            data: audioBase64,
          },
        },
        { text: PROMPT },
      ],
    },
  });

  return response.text;
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('File could not be read as a data URL.'));
      }
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};
