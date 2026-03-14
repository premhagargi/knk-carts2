'use server';
/**
 * @fileOverview A Genkit flow that answers user questions based on provided website content.
 *
 * - answerWebsiteContent - A function that handles answering questions using the website content.
 * - ChatbotInput - The input type for the answerWebsiteContent function.
 * - ChatbotOutput - The return type for the answerWebsiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  userQuestion: z.string().describe('The question posed by the user.'),
  websiteContent: z.string().describe('The content of the website to answer questions from.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question based on the website content.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function answerWebsiteContent(input: ChatbotInput): Promise<ChatbotOutput> {
  return answerWebsiteContentFlow(input);
}

const answerWebsiteContentPrompt = ai.definePrompt({
  name: 'answerWebsiteContentPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a helpful and knowledgeable assistant that answers questions about a website's content.

Use ONLY the provided website content to answer the user's question. If the answer cannot be found in the provided content, state that you don't have enough information from the given content to answer the question.

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
