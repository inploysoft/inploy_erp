import { defineFunction, secret } from '@aws-amplify/backend';

export const parseComplexField = defineFunction({
  name: 'parse-complex-field',
  entry: './handler.ts',
  environment: {
    OPENAI_API_KEY: secret('OPENAI_API_KEY'),
  },
  memoryMB: 2048,
  timeoutSeconds: 60,
});
