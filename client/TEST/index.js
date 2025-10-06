import { GoogleGenAI } from "@google/genai";
import cosineSimilarity from "compute-cosine-similarity";

async function main() {
    const ai = new GoogleGenAI({apiKey: "AIzaSyBlxvRFKgVMho1xdtXHeSGaqBTxl4Rj2XY"});

    const texts = [
        "I don't understand how to apply F=ma when the mass is given in grams. Do I need to convert it first?",
        "In the homework problem about the car, why do we use 1200kg for mass? How do I know what units to use?",
        "When calculating force, my answer is always wrong. I think I'm making a mistake with the acceleration part.",
        "Can you show me step by step how to solve F=ma problems? I get confused with the unit conversions."
    
    ];

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: texts,
        taskType: 'SEMANTIC_SIMILARITY'
    });

    const embeddings = response.embeddings.map(e => e.values);

    for (let i = 0; i < texts.length; i++) {
        for (let j = i + 1; j < texts.length; j++) {
            const text1 = texts[i];
            const text2 = texts[j];
            const similarity = cosineSimilarity(embeddings[i], embeddings[j]);
            console.log(`Similarity between '${text1}' and '${text2}': ${similarity.toFixed(4)}`);
        }
    }
}

main();