import { env } from '$amplify/env/parse-excel-to-json';

import { OpenAI } from 'openai';

import type { Schema } from '../../data/resource';
import { finalInstructions, subParsingInstructions } from './prompt';

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const handler: Schema['parseExcelToJson']['functionHandler'] = async (
  event,
) => {
  const { headers, rows, subParsingFields } = event.arguments;

  let subParsingResponse: string | null = null;
  let subFields: string[] | null = null;

  if (subParsingFields) {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      instructions: subParsingInstructions(rows as unknown as string[][]),
      input: `Rows: ${rows}`,
    });

    const nonNullableSubParsingFields = subParsingFields?.filter(
      (field): field is string => field !== null,
    );

    subParsingResponse = response.output_text;
    subFields = nonNullableSubParsingFields;
  }

  const nonNullableHeaders = headers.filter(
    (header): header is string => header !== null,
  );

  const instructions = finalInstructions(
    nonNullableHeaders,
    rows as unknown as string[][],
    subParsingResponse,
    subFields,
  );

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    instructions: instructions,
    input: `Headers: ${headers}, Rows: ${rows}, SubParsingResponse: ${subParsingResponse}, SubFields: ${subFields}`,
  });

  return JSON.parse(response.output_text);
};
