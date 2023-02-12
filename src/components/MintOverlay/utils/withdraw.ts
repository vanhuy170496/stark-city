import { EHT_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from './config';
import { getStarknet } from './starknet';
import web3Utils from 'web3-utils';

export const withdraw = async () => {
  const starknet = getStarknet();
  const data = await starknet.account.callContract({
    contractAddress: EHT_CONTRACT_ADDRESS,
    entrypoint: 'balanceOf',
    calldata: [web3Utils.toBN(NFT_CONTRACT_ADDRESS).toString()],
  });
  const balance = data.result[0];
  await starknet.account.execute([
    {
      contractAddress: NFT_CONTRACT_ADDRESS,
      entrypoint: 'approveEth',
      calldata: [NFT_CONTRACT_ADDRESS, balance, 0],
    },
    {
      contractAddress: NFT_CONTRACT_ADDRESS,
      entrypoint: 'withdraw',
      calldata: [starknet.account.address, balance, 0],
    },
  ]);
};
