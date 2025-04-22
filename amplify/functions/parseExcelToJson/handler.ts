import { env } from '$amplify/env/parse-excel-to-json';

import { OpenAI } from 'openai';

import type { Schema } from '../../data/resource';
import {
  finalInstructions,
  subParsingInstructions,
  SubParsingKeys,
} from './prompt';

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const handler: Schema['parseExcelToJson']['functionHandler'] = async (
  event,
) => {
  const { headers, rows, subParsingKeys } = event.arguments;

  let subParsingResponse: string = '';

  if (subParsingKeys) {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      instructions: subParsingInstructions(rows as unknown as string[][]),
      input: `Rows: ${rows}`,
    });

    subParsingResponse = response.output_text;
  }

  const nonNullableHeaders = headers.filter(
    (header): header is string => header !== null,
  );

  if (!subParsingKeys) {
    return JSON.parse('No subParsingKeys');
  }

  const instructions = finalInstructions(
    nonNullableHeaders,
    rows as unknown as string[][],
    subParsingResponse,
    subParsingKeys as SubParsingKeys,
  );

  console.log('subParsingResponse', subParsingResponse);
  console.log('subParsingKeys', subParsingKeys);

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    instructions: instructions,
    input: `Headers: ${headers}, Rows: ${rows}, SubParsingResponse: ${subParsingResponse}, SubParsingKeys: ${subParsingKeys}`,
  });

  return JSON.parse(response.output_text);
};
