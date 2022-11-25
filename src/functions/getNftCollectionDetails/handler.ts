import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


const getNftCollectionDetails = async (event) => {
  console.log(process.env.ALCHEMY_API_KEY);
  console.log(event.pathParameters);
  return formatJSONResponse({});
};

export const main = middyfy(getNftCollectionDetails);
