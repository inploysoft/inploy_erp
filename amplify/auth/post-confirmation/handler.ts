import { env } from '$amplify/env/post-confirmation';
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import type { PostConfirmationTriggerHandler } from 'aws-lambda';

const client = new CognitoIdentityProviderClient();

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const isAdmin = event.request.userAttributes['custom:is_admin'];

  const groupName = isAdmin ? env.GROUP_ADMINS : env.GROUP_USERS;

  const command = new AdminAddUserToGroupCommand({
    GroupName: groupName,
    Username: event.userName,
    UserPoolId: event.userPoolId,
  });

  try {
    const response = await client.send(command);

    console.log(`User ${event.userName} added to ${groupName} group`);
    console.log('processed', response.$metadata.requestId);
  } catch (error) {
    console.error(`Error adding user to ${groupName} group:`, error);
  }

  return event;
};
