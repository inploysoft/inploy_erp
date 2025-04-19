import { env } from '$amplify/env/parse-excel-to-json';

import { OpenAI } from 'openai';

import type { Schema } from '../../data/resource';

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const handler: Schema['parseExcelToJson']['functionHandler'] = async (
  event,
) => {
  const { headers, rows } = event.arguments;

  const instructions = `
  **Identity**
  You are an expert at parsing Excel data to JSON.
  
  **Given Data**
  - Headers: ${headers}
  - Rows: ${rows}

  **Instructions**
  - Convert each row into a JSON object using the headers as keys.
  - Only return the result as a JSON array, nothing else.

  **Example**
  - Headers: ["Name", "Age", "City"]
  - Rows: ["John", "25", "New York"]
  - Output: [{
              "Name": "John", 
              "Age": "25", 
              "City": "New York",
            }]
  `;

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    instructions: instructions,
    input: `Headers: ${headers}, Rows: ${rows}`,
  });

  console.log(response.output_text);

  return JSON.parse(response.output_text);
};
