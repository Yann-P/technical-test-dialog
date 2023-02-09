import { alchemy } from '@libs/alchemy-api';

const fetchContractMetadata = async (
  contractAddress: string
): Promise<{
  name?: string;
  address: string;
  imageUrl?: string;
  tokenType: string;
}> => {
  const res = await alchemy.nft.getContractMetadata(contractAddress);
  return {
    name: res.name,
    address: res.address,
    imageUrl: res.openSea?.imageUrl,
    tokenType: res.tokenType,
  };
};

export { fetchContractMetadata };
