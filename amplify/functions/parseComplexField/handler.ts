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

  const nonNullableFields = complexFields.filter(
    (field): field is string => field !== null,
  );

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    instructions: generateInstructions(nonNullableFields),
    input: [
      {
        role: 'system',
        content: `You are an expert at structured data extraction. Convert the unstructured data ${nonNullableFields} into the given structure.`,
      },
      { role: 'user', content: `${nonNullableFields}` },
    ],
    text: structuredText(),
  });

  return JSON.parse(response.output_text);
};
