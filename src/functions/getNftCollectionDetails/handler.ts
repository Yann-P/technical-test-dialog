import { formatJSONErrorResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { fetchContractMetadata } from '@services/getNftCollectionDetails.service';

const getNftCollectionDetailsHandler = async (event: {
  pathParameters: { contractAddress?: string };
}) => {
  const contractAddress = event.pathParameters?.contractAddress;

  if (contractAddress === undefined) {
    return formatJSONErrorResponse(400, 'Required parameter: contractAddress');
  }

  try {
    const metadata = await fetchContractMetadata(contractAddress);

    return formatJSONResponse(metadata);
  } catch (e) {
    console.error('Unable to fetch metadata', e);
    return formatJSONErrorResponse(500, 'Unable to fetch metadata');
  }
};

export const main = middyfy(getNftCollectionDetailsHandler);
