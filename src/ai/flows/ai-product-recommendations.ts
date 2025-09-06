// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered product recommendations flow.
 *
 * This file defines a Genkit flow that provides personalized product recommendations
 * based on user browsing history and purchase behavior.
 *
 * @fileOverview A plant problem diagnosis AI agent.
 * - getAIProductRecommendations - A function that returns product recommendations.
 * - AIProductRecommendationsInput - The input type for the getAIProductRecommendations function.
 * - AIProductRecommendationsOutput - The return type for the getAIProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProductRecommendationsInputSchema = z.object({
  userHistory: z.string().describe('The user browsing history and purchase behavior.'),
  numberOfRecommendations: z.number().default(5).describe('The number of product recommendations to return.'),
});
export type AIProductRecommendationsInput = z.infer<typeof AIProductRecommendationsInputSchema>;

const AIProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of product recommendations.'),
});
export type AIProductRecommendationsOutput = z.infer<typeof AIProductRecommendationsOutputSchema>;

export async function getAIProductRecommendations(input: AIProductRecommendationsInput): Promise<AIProductRecommendationsOutput> {
  return aiProductRecommendationsFlow(input);
}

const aiProductRecommendationsPrompt = ai.definePrompt({
  name: 'aiProductRecommendationsPrompt',
  input: {schema: AIProductRecommendationsInputSchema},
  output: {schema: AIProductRecommendationsOutputSchema},
  prompt: `You are an e-commerce product recommendation expert. Based on the user's history, provide personalized product recommendations.

User History: {{{userHistory}}}

Please provide {{numberOfRecommendations}} product recommendations. Return them as a numbered list.
`,
});

const aiProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiProductRecommendationsFlow',
    inputSchema: AIProductRecommendationsInputSchema,
    outputSchema: AIProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await aiProductRecommendationsPrompt(input);
    return output!;
  }
);
