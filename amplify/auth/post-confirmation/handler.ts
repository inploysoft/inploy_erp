import { Amplify } from 'aws-amplify';

import { env } from '$amplify/env/post-confirmation';

import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { generateClient } from 'aws-amplify/data';
import type { PostConfirmationTriggerHandler } from 'aws-lambda';

import { type Schema } from '../../data/resource';

// https://docs.amplify.aws/react/build-a-backend/data/customize-authz/grant-lambda-function-access-to-api/
const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

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

    // TODO: 20250326 하드코딩 수정 필요
    const createUser = await dataClient.models.CompanyMember.create({
      sub: event.request.userAttributes['sub'],
      companyId: 'd9244152-3bbd-4a02-938f-86e561ec9d8b',
      email: event.request.userAttributes['email'],
      isAdmin: isAdmin === 'true',
      name: '',
      phone: '',
    });

    console.log('createUser', createUser);
  } catch (error) {
    console.error(`Error adding user to ${groupName} group:`, error);
  }

  return event;
};
