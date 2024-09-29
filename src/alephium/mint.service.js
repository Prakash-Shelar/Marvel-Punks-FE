import { DUST_AMOUNT, ExecutableScript, Script } from '@alephium/web3';
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
    attoAlphAmount: DUST_AMOUNT,
  });
};
