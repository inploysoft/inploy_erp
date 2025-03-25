import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from './post-confirmation/resource';

// https://docs.amplify.aws/react/build-a-backend/auth/concepts/user-attributes/
export const auth = defineAuth({
  name: 'inploy-dev-userpool',
  loginWith: {
    email: true,
    phone: true,
  },

  groups: ['ADMINS', 'USERS'],

  triggers: {
    postConfirmation: postConfirmation,
  },

  access: (allow) => [allow.resource(postConfirmation).to(['addUserToGroup'])],

  userAttributes: {
    email: {
      mutable: true,
      required: true,
    },

    'custom:company_name': {
      dataType: 'String',
      mutable: true,
      maxLen: 16,
      minLen: 1,
    },

    'custom:is_admin': {
      dataType: 'Boolean',
      mutable: true,
    },
  },
});
