'use server';
/**
 * @fileOverview A flow for generating product videos.
 *
 * - generateProductVideo - A function that generates a video for a product.
 * - GenerateProductVideoInput - The input type for the generateProductVideo function.
 * - GenerateProductVideoOutput - The return type for the generateProductVideo function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';

const GenerateProductVideoInputSchema = z.object({
  productDescription: z.string().describe('The description of the product to generate a video for.'),
});
export type GenerateProductVideoInput = z.infer<typeof GenerateProductVideoInputSchema>;

const GenerateProductVideoOutputSchema = z.object({
  video: z.string().describe("The generated video as a data URI. Expected format: 'data:video/mp4;base64,<encoded_data>'."),
});
export type GenerateProductVideoOutput = z.infer<typeof GenerateProductVideoOutputSchema>;

export async function generateProductVideo(input: GenerateProductVideoInput): Promise<GenerateProductVideoOutput> {
  return generateProductVideoFlow(input);
}

const generateProductVideoFlow = ai.defineFlow(
  {
    name: 'generateProductVideoFlow',
    inputSchema: GenerateProductVideoInputSchema,
    outputSchema: GenerateProductVideoOutputSchema,
  },
  async (input) => {
    let { operation } = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'),
        prompt: input.productDescription,
        config: {
          durationSeconds: 5,
          aspectRatio: '16:9',
        },
      });

      if (!operation) {
        throw new Error('Expected the model to return an operation');
      }
    
      // Wait until the operation completes.
      while (!operation.done) {
        operation = await ai.checkOperation(operation);
        // Sleep for 5 seconds before checking again.
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      if (operation.error) {
        throw new Error('failed to generate video: ' + operation.error.message);
      }
    
      const video = operation.output?.message?.content.find((p) => !!p.media);
      if (!video || !video.media?.url) {
        throw new Error('Failed to find the generated video');
      }

      const fetch = (await import('node-fetch')).default;
      const videoDownloadResponse = await fetch(
        `${video.media.url}&key=${process.env.GEMINI_API_KEY}`
      );

      if (
        !videoDownloadResponse ||
        videoDownloadResponse.status !== 200 ||
        !videoDownloadResponse.body
      ) {
        throw new Error('Failed to fetch video');
      }

      const videoBuffer = await videoDownloadResponse.arrayBuffer();
      const base64Video = Buffer.from(videoBuffer).toString('base64');
      
      return {
        video: 'data:video/mp4;base64,' + base64Video,
      };
  }
);
