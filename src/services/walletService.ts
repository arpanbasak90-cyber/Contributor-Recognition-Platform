import walletService from './wallet';

export const {
  isConnected,
  isAllowed,
  setAllowed,
  getPublicKey,
  getAddress,
  signTransaction
} = walletService;

export default walletService;
