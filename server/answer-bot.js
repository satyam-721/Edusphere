import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: ""   // Ashish key 
});




function extractText(response) {
  return (
    response?.candidates?.[0]?.content?.parts?.[0] ||
    {text:"No response text found."}
  );
}

export async function askGemini(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    // console.log("Full Gemini response:", response);
    return extractText(response);
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error while generating response.";
  }
}


// askGemini("Explain Einstein's theory of relativity in simple terms.").then(responseText => {
//   console.log("Gemini response text:", responseText);
// });