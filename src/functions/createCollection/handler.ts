import { formatJSONErrorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Collection } from 'src/models/Collection';
import { fetchContractMetadata } from '@services/getNftCollectionDetails.service';

const createCollection = async (event: {
  body: { contractAddress: string };
}) => {
  const contractAddress = event.body?.contractAddress;
  if (contractAddress === undefined) {
    return formatJSONErrorResponse(400, 'Required parameter: contractAddress');
  }

  let details;
  try {
    details = await fetchContractMetadata(contractAddress);
  } catch (e) {
    console.error('Unable to fetch metadata', e);
    return formatJSONErrorResponse(500, 'Unable to fetch metadata');
  }

  try {
    await Collection.create({
      collectionName: details.name,
      contractAddress: details.address,
      logo: details.imageUrl,
    });
  } catch (e) {
    console.error('Unable to create collection', e);
    return formatJSONErrorResponse(500, 'Unable to create collection');
  }

  return formatJSONResponse({
    contractAddress,
  });
};

export const main = middyfy(createCollection);
