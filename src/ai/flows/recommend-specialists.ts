// src/ai/flows/recommend-specialists.ts
'use server';

/**
 * @fileOverview AI flow to recommend relevant specialists to a patient based on symptoms, location, and past consultation history.
 *
 * - recommendSpecialists - A function that recommends specialists.
 * - RecommendSpecialistsInput - The input type for the recommendSpecialists function.
 * - RecommendSpecialistsOutput - The return type for the recommendSpecialists function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSpecialistsInputSchema = z.object({
  symptoms: z.string().describe('Description of the patient\'s symptoms.'),
  location: z.string().describe('The patient\'s location (city, area).'),
  pastConsultationHistory: z.string().optional().describe('Summary of the patient\'s past consultation history.'),
});
export type RecommendSpecialistsInput = z.infer<typeof RecommendSpecialistsInputSchema>;

const SpecialistSchema = z.object({
  speciality: z.string().describe('The speciality of the doctor (e.g., cardiologist, pediatrician).'),
  reason: z.string().describe('Why this speciality is recommended based on the input.'),
});

const RecommendSpecialistsOutputSchema = z.array(SpecialistSchema).describe('A list of recommended medical specialities and the reasoning behind each recommendation.');
export type RecommendSpecialistsOutput = z.infer<typeof RecommendSpecialistsOutputSchema>;


export async function recommendSpecialists(input: RecommendSpecialistsInput): Promise<RecommendSpecialistsOutput> {
  return recommendSpecialistsFlow(input);
}

const recommendSpecialistsPrompt = ai.definePrompt({
  name: 'recommendSpecialistsPrompt',
  input: {schema: RecommendSpecialistsInputSchema},
  output: {schema: RecommendSpecialistsOutputSchema},
  prompt: `You are an AI assistant specialized in recommending relevant medical specialities to patients.

  Based on the patient's described symptoms, location, and past consultation history, identify the most appropriate medical specialities for their needs.
  Explain the reasoning behind each recommendation.

  Symptoms: {{{symptoms}}}
  Location: {{{location}}}
  Past Consultation History: {{{pastConsultationHistory}}}

  Consider the location to find specialities that would be most helpful in that region. Pay special attention to the symptoms, as those are most important.
  Return the list of specialities in JSON format. Make sure it is a valid JSON array.
  `,
});

const recommendSpecialistsFlow = ai.defineFlow(
  {
    name: 'recommendSpecialistsFlow',
    inputSchema: RecommendSpecialistsInputSchema,
    outputSchema: RecommendSpecialistsOutputSchema,
  },
  async input => {
    const {output} = await recommendSpecialistsPrompt(input);
    return output!;
  }
);
