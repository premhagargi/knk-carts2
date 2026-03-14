'use server';
/**
 * @fileOverview A Genkit flow that answers user questions about Visions, Concepts & Realities (VCR).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  userQuestion: z.string().describe('The question posed by the user.'),
  websiteContent: z.string().describe('The content of the website to answer questions from.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question based on VCR brand identity.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function answerWebsiteContent(input: ChatbotInput): Promise<ChatbotOutput> {
  return answerWebsiteContentFlow(input);
}

const answerWebsiteContentPrompt = ai.definePrompt({
  name: 'answerWebsiteContentPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a helpful and knowledgeable assistant for Visions, Concepts & Realities (VCR).

VCR is a specialized design firm associated with KnK Karts (P) Ltd., holding the design rights for all karts manufactured by KnK.
Key information:
- Proprietor: Mr. Indrajeet Singh.
- Co-founded: By Indrajeet Singh and his son Ishaan Singh in 2000.
- Philosophy: Function-driven, unorthodox design, avoiding mass-produced robotic manufacturing.
- Manufacturing Partner: KnK Karts.
- VCR defines the "Visions, Concepts, and Realities" behind every machine.

Use the provided website content to answer the user's question. Emphasize VCR as the design authority.

Website Content:
{{websiteContent}}

User Question: {{userQuestion}}

Your Answer:`,
});

const answerWebsiteContentFlow = ai.defineFlow(
  {
    name: 'answerWebsiteContentFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await answerWebsiteContentPrompt(input);
    return output!;
  }
);
