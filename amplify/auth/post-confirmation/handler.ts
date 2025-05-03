import { env } from '$amplify/env/post-confirmation';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { PostConfirmationTriggerHandler } from 'aws-lambda';

import { type Schema } from '../../data/resource';

import dayjs from 'dayjs';

const authClient = new CognitoIdentityProviderClient();

// https://docs.amplify.aws/react/build-a-backend/data/customize-authz/grant-lambda-function-access-to-api/
const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const dataClient = generateClient<Schema>();

export const handler: PostConfirmationTriggerHandler = async (event) => {
  console.log('here', event.request.userAttributes);

  const isAdmin = event.request.userAttributes['custom:is_admin'];

  const groupName = isAdmin ? env.GROUP_ADMINS : env.GROUP_USERS;

  const command = new AdminAddUserToGroupCommand({
    GroupName: groupName,
    Username: event.userName,
    UserPoolId: event.userPoolId,
  });

  try {
    await authClient.send(command);

    await dataClient.models.CompanyMember.create({
      sub: event.request.userAttributes['sub'],
      companyId: event.request.userAttributes['company_id'],
      email: event.request.userAttributes['email'],
      isAdmin: isAdmin === 'true',
      name: event.request.userAttributes['name'],
      phone: event.request.userAttributes['phone_number'],
      joinedAt: dayjs().format('YYYY-MM-DD'),
    });
  } catch (error) {
    console.error(`Error adding user to ${groupName} group:`, error);
  }

  return event;
};
