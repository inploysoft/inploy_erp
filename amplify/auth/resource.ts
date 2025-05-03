import { defineAuth } from '@aws-amplify/backend';
import { postConfirmation } from './post-confirmation/resource';

// https://docs.amplify.aws/react/build-a-backend/auth/concepts/user-attributes/
// TODO: 20250413 phone 로그인 옵션 삭제
export const auth = defineAuth({
  loginWith: {
    email: true,
  },

  accountRecovery: 'EMAIL_ONLY',

  groups: ['ADMINS', 'EMPLOYEES'],

  triggers: {
    postConfirmation: postConfirmation,
  },

  access: (allow) => [allow.resource(postConfirmation).to(['addUserToGroup'])],

  userAttributes: {
    fullname: {
      required: true,
    },

    'custom:company_id': {
      dataType: 'String',
      mutable: true,
    },

    'custom:is_admin': {
      dataType: 'Boolean',
      mutable: true,
    },
  },
});
