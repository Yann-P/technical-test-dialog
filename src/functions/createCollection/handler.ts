import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const createCollection = async (event) => {

  return formatJSONResponse({});
};

export const main = middyfy(createCollection);
