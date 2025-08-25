// src/ai/flows/smart-reply.ts
'use server';
/**
 * @fileOverview A smart reply suggestion AI agent.
 *
 * - smartReplySuggestions - A function that generates smart reply suggestions.
 * - SmartReplyInput - The input type for the smartReplySuggestions function.
 * - SmartReplyOutput - The return type for the smartReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReplyInputSchema = z.object({
  messageHistory: z.array(z.string()).describe('The recent message history in the chat.'),
});
export type SmartReplyInput = z.infer<typeof SmartReplyInputSchema>;

const SmartReplyOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('Suggested replies based on the message history.'),
});
export type SmartReplyOutput = z.infer<typeof SmartReplyOutputSchema>;

export async function smartReplySuggestions(input: SmartReplyInput): Promise<SmartReplyOutput> {
  try {
    return await smartReplyFlow(input);
  } catch (error) {
    console.error('Error in smartReplyFlow:', error);
    // Return empty suggestions if the flow fails, e.g., due to API key issues.
    return { suggestions: [] };
  }
}

const prompt = ai.definePrompt({
  name: 'smartReplyPrompt',
  input: {schema: SmartReplyInputSchema},
  output: {schema: SmartReplyOutputSchema},
  prompt: `You are a helpful assistant that suggests smart replies based on the recent message history in a chat.

Message History:
{{#each messageHistory}}
- {{{this}}}
{{/each}}

Suggest three short and relevant replies:
`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const smartReplyFlow = ai.defineFlow(
  {
    name: 'smartReplyFlow',
    inputSchema: SmartReplyInputSchema,
    outputSchema: SmartReplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
