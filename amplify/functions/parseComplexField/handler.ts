import { env } from '$amplify/env/parse-complex-field';
import type { Schema } from '../../data/resource';

import { OpenAI } from 'openai';

import { generateInstructions, structuredText } from './prompt';

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const handler: Schema['parseComplexField']['functionHandler'] = async (
  event,
) => {
  const { complexFields } = event.arguments;

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    instructions: generateInstructions(),
    input: [
      {
        role: 'system',
        content: `Input data is a string array containing multiple membership descriptions. You are job is to separate each membership description from the element to format it into a structured output.`,
      },
      {
        role: 'user',
        content: JSON.stringify(complexFields, null, 2),
      },
    ],
    text: structuredText(),
  });

  const parsed = JSON.parse(response.output_text);

  return parsed.memberships;
};
