import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: "AIzaSyBF2PShbqCtL1v0yr1LGHcOfpzehs1_Lus"   // check this key 
});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "How do I calculate force using F=ma when the mass is given in grams? Do I need to convert it first?",
//     config: {
//       thinkingConfig: {
//         thinkingBudget: 0
//       }
//     }
//   });
//   const output = response.candidates[0].content.parts[0];   //convert this into text using .text
//   console.log(output);

// }

// main();


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