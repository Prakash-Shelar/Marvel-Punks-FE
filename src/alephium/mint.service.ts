import {
  DUST_AMOUNT,
  ExecuteScriptResult,
  SignerProvider,
} from '@alephium/web3';
import { Mint } from './artifacts/ts/scripts';

export const mintToken = async (
  signerProvider: SignerProvider,
  marvelPunksCollection: string,
  nftUri: string,
): Promise<ExecuteScriptResult> => {
  return await Mint.execute(signerProvider, {
    initialFields: {
      marvelPunksCollection,
      nftUri,
    },
    attoAlphAmount: DUST_AMOUNT,
  });
};
