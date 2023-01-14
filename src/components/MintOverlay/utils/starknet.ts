import { connect, getStarknet as _getStarknet, IStarknetWindowObject } from 'get-starknet-wallet';
import { CONNECTED_KEY } from './config';

export const getStarknet = _getStarknet;

export const connectWallet = async (
  showList = true,
  showModal = true,
): Promise<IStarknetWindowObject> => {
  let starknet = getStarknet();
  if (!starknet?.isConnected) {
    starknet = (await connect({ showList })) ?? starknet;
    if (starknet) await starknet.enable({ showModal });
  }

  setLastConnected(starknet.isConnected);

  return starknet;
};

export const disconnectWallet = async () => {
  let starknet = getStarknet();
  setLastConnected(false);
  starknet.isConnected = false;
  return starknet;
};

export const setLastConnected = (active: boolean) => {
  return localStorage.setItem(CONNECTED_KEY, active ? '1' : '0');
};

export const isLastConnected = (): boolean => {
  return localStorage.getItem(CONNECTED_KEY) === '1';
};

export const initialConnect = async () => {
  try {
    if (isLastConnected()) {
      const starknet = await connectWallet(false, false);
      if (!starknet.isConnected) setLastConnected(false);
    }
  } catch (error) {}
};
