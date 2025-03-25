import { defineFunction } from '@aws-amplify/backend';

// https://docs.amplify.aws/react/build-a-backend/functions/examples/add-user-to-group/
export const postConfirmation = defineFunction({
  name: 'post-confirmation',
  environment: {
    GROUP_ADMINS: 'ADMINS',
    GROUP_USERS: 'USERS',
  },
  resourceGroupName: 'auth',
});
