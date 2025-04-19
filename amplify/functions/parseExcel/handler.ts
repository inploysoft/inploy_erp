import type { Schema } from '../../data/resource';

export const handler: Schema['parseExcel']['functionHandler'] = async (
  event,
) => {
  const { headers, rows } = event.arguments;
  // your function code goes here
  return 'Hello, World!';
};
