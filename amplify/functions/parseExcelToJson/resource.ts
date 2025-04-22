import { defineFunction, secret } from '@aws-amplify/backend';

export const parseExcelToJson = defineFunction({
  name: 'parse-excel-to-json',
  entry: './handler.ts',
  environment: {
    OPENAI_API_KEY: secret('OPENAI_API_KEY'),
  },
  memoryMB: 1024,
  timeoutSeconds: 10,
});
