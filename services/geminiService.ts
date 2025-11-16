
import { GoogleGenAI, Type } from "@google/genai";
import type { Difficulty, Category, Target, AIAnalysis } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const promptVariations = {
  Beginner: [
    "Describe a single, simple geometric shape with a primary color. Be concise. Examples: 'A blue square', 'The color red'.",
    "Generate a target that is just a primary color, described simply. For example, 'The feeling of yellow' or 'A field of pure green'.",
    "Provide a description of a basic shape (like a circle, square, or triangle) in a single, solid color.",
  ],
  Intermediate: [
    "Describe a common, everyday object with 2-3 distinct sensory details (e.g., texture, sound, smell, shape). Do not name the object. Example: 'Cool, smooth glass; a faint scent of fruit.'",
    "Generate a target description focusing on the texture and temperature of a familiar object. Example: 'Rough, warm, and fibrous.'",
    "Describe a single food item by its taste and smell only. Do not name it.",
  ],
  Advanced: [
    "Describe a dynamic, real-world location focusing on the atmosphere, sounds, and general activity. Do not name the location. Example: 'The smell of salt and sunscreen. Rhythmic crashing sounds.'",
    "Generate a target based on a specific weather condition from a first-person perspective. Example: 'A quiet cold. The gentle pressure of flakes landing. A world muffled in white.'",
    "Describe the inside of a bustling public building using only sounds and smells.",
  ],
  Expert: [
    "Describe a significant historical or cultural event from a first-person sensory perspective. Focus on abstract feelings and the general atmosphere without naming the event. Example: 'A wave of shared hope and excitement. A powerful, resonant voice echoing.'",
    "Generate a target based on a complex human emotion, such as 'nostalgia' or 'ambition', using only metaphorical language.",
    "Describe a dream-like scene with one or two illogical or surreal elements.",
  ],
  Master: [
    "Describe a complex, abstract concept (e.g., 'entropy', 'justice', 'synchronicity') using only metaphorical and sensory language. Do not name the concept. Example: 'A constant, slow unwinding. The gentle cooling of a once-hot star.'",
    "Generate a target that represents a fundamental law of physics (e.g., gravity, thermodynamics) through poetic, sensory-based description.",
    "Describe the 'gestalt' or overall feeling of a decade in time (e.g., the 1920s, the 1990s) without mentioning specifics.",
  ],
};

const getTargetPrompt = (difficulty: Difficulty, category: Category): string => {
  const variations = promptVariations[difficulty];
  const randomPrompt = variations[Math.floor(Math.random() * variations.length)];
  return `${randomPrompt} The target should fit the category: ${category}.`;
};

export const generateTarget = async (difficulty: Difficulty, category: Category): Promise<Target> => {
  try {
    const prompt = getTargetPrompt(difficulty, category);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const description = response.text.trim();
    return {
      id: `target-${Date.now()}`,
      description,
      difficulty,
      category,
      entropyScore: Math.random() * 100, // Simulated entropy score
    };
  } catch (error) {
    console.error("Error generating target:", error);
    // Return a fallback target
    return {
      id: 'fallback-target',
      description: 'A calm, silent, blue space.',
      difficulty,
      category,
      entropyScore: 25,
    };
  }
};


const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    accuracyRatio: { type: Type.NUMBER, description: "A score from 0.0 to 1.0 representing overall accuracy." },
    strengthOfEvidence: { type: Type.NUMBER, description: "A score from 0.0 to 1.0 for the confidence in the match." },
    statisticalSignificance: { type: Type.NUMBER, description: "A p-value like score from 0.0 to 1.0 indicating if the match is statistically significant." },
    summary: { type: Type.STRING, description: "A brief, one or two sentence constructive summary of the user's performance." },
    attributeMatches: {
      type: Type.ARRAY,
      description: "A list of key sensory or conceptual attributes, comparing target to user description.",
      items: {
        type: Type.OBJECT,
        properties: {
          attribute: { type: Type.STRING, description: "The attribute being compared (e.g., 'Color: Red', 'Feeling: Calm')." },
          targetPresence: { type: Type.BOOLEAN, description: "Was this attribute present in the target description?" },
          userPresence: { type: Type.BOOLEAN, description: "Was this attribute present in the user's description?" },
          match: { type: Type.BOOLEAN, description: "Is this a match?" },
        },
        required: ["attribute", "targetPresence", "userPresence", "match"]
      }
    }
  },
  required: ["accuracyRatio", "strengthOfEvidence", "statisticalSignificance", "summary", "attributeMatches"]
};


export const analyzeSession = async (targetDescription: string, userDescription: string): Promise<AIAnalysis> => {
  try {
    const prompt = `Analyze the following remote viewing session.
      TARGET DESCRIPTION: "${targetDescription}"
      USER'S DESCRIPTION: "${userDescription}"
      
      Compare the user's description to the target description. Based on your analysis, provide a JSON object with a detailed breakdown. The analysis should be fair but critical, identifying both matches and misses in sensory data, concepts, and gestalts. Identify 5-7 key attributes for the comparison.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    let jsonString = response.text;
    
    // Clean potential markdown code block fences
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.slice(7, -3).trim();
    }
    
    const analysisResult = JSON.parse(jsonString);
    return analysisResult;
  } catch (error) {
    console.error("Error analyzing session:", error);
    // Return fallback analysis
    return {
      accuracyRatio: 0.1,
      strengthOfEvidence: 0.1,
      statisticalSignificance: 0.8,
      summary: "AI analysis failed. Please try again.",
      attributeMatches: [{ attribute: "Error", targetPresence: true, userPresence: false, match: false }],
    };
  }
};
