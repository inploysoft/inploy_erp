import { defineFunction, secret } from '@aws-amplify/backend';

export const parseExcelToJson = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'parse-excel-to-json',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',

  environment: {
    OPENAI_API_KEY: secret('OPENAI_API_KEY'),
  },
});
