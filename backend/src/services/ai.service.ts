import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";
import { TalentProfile } from "../types/talent";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Helper to pause execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const evaluateCandidate = async (jobDescription: string, candidate: TalentProfile) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", 
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          score: { type: SchemaType.INTEGER },
          strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          gaps: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          recommendation: { type: SchemaType.STRING },
        },
        required: ["score", "strengths", "gaps", "recommendation"],
      },
    },
  });

  const prompt = `
    You are an expert technical recruiter. Evaluate the candidate against the provided job description.
    Job Description: ${jobDescription}
    Candidate Profile (JSON): ${JSON.stringify(candidate, null, 2)}
    Provide an objective evaluation.
  `;

  // Retry logic configuration
  const maxRetries = 3;
  let delayMs = 2000; // Start with a 2-second wait

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      return JSON.parse(response);
    } catch (error: any) {
      console.warn(`[Attempt ${attempt} Failed]: ${error.message}`);
      
      // If it's a 503 (Overloaded) or 429 (Rate Limit) and we have retries left, wait and retry.
      if ((error.status === 503 || error.status === 429) && attempt < maxRetries) {
        console.log(`Waiting ${delayMs / 1000} seconds before retrying...`);
        await delay(delayMs);
        delayMs *= 2; // Exponential backoff: wait 2s, then 4s, then 8s
      } else {
        throw new Error("Failed to process AI evaluation after multiple attempts.");
      }
    }
  }
};