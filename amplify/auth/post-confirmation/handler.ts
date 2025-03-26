import { env } from '$amplify/env/post-confirmation';
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { generateClient } from 'aws-amplify/data';
import type { PostConfirmationTriggerHandler } from 'aws-lambda';

import { type Schema } from '../../data/resource';

const authClient = new CognitoIdentityProviderClient();

const dataClient = generateClient<Schema>();

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const isAdmin = event.request.userAttributes['custom:is_admin'];

  const groupName = isAdmin ? env.GROUP_ADMINS : env.GROUP_USERS;

  const command = new AdminAddUserToGroupCommand({
    GroupName: groupName,
    Username: event.userName,
    UserPoolId: event.userPoolId,
  });

  try {
    const response = await authClient.send(command);

    console.log(`User ${event.userName} added to ${groupName} group`);
    console.log('processed', response.$metadata.requestId);

    // TODO: 20250326 client 추가 필요
    const createUser = await dataClient.models.User.create({
      clientId: 'c0352be9-e3bd-4c71-82d5-50e354c6faf4',
      email: event.request.userAttributes['email'],
      isAdmin: isAdmin === 'true',
    });

    console.log('createUser', createUser);
  } catch (error) {
    console.error(`Error adding user to ${groupName} group:`, error);
  }

  return event;
};
