import { generateClient } from 'aws-amplify/data';
import { ConsoleLogger } from 'aws-amplify/utils';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

const logger = new ConsoleLogger('API');

export async function fetchModules(): Promise<
  Schema['Module']['type'][] | undefined
> {
  try {
    const { data, errors } = await client.models.Module.list({
      authMode: 'userPool',
    });

    if (errors) {
      logger.error('fetchModules: ', errors);
      return;
    }

    return data;
  } catch (error) {
    logger.error('Unexpected Errors: ', error);
  }
}
