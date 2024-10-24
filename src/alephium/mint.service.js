import {
  DEFAULT_GAS_AMOUNT,
  DUST_AMOUNT,
  ExecutableScript,
  ONE_ALPH,
  Script,
} from '@alephium/web3';
// import { Mint } from './artifacts/ts/scripts';
import { default as MintScriptJson } from './artifacts/Mint.ral.json';
import { getContractByCodeHash } from './artifacts/ts/contracts';

export const Mint = new ExecutableScript(
  Script.fromJson(MintScriptJson, '', []),
  getContractByCodeHash,
);

export const mintToken = async (
  signerProvider,
  marvelPunksCollection,
  nftUri,
) => {
  return await Mint.execute(signerProvider, {
    initialFields: {
      marvelPunksCollection,
      nftUri,
    },
    gasAmount: DEFAULT_GAS_AMOUNT,
    attoAlphAmount: ONE_ALPH + DUST_AMOUNT,
    // tokens: [{ id: ALPH_TOKEN_ID, amount: ONE_ALPH * 2n }],
  });
};
