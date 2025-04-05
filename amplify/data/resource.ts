import { type ClientSchema, defineData } from '@aws-amplify/backend';

import { schema } from '.';

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
