import { ExecutableScript, Script } from '@alephium/web3';
// import { Mint } from './artifacts/ts/scripts';
import {
  DEFAULT_GAS_AMOUNT,
  DUST_AMOUNT,
  ONE_ALPH,
} from '@alephium/web3';
import { default as MintScriptJson } from './artifacts/Mint.ral.json';
// import { getContractByCodeHash } from './artifacts/ts/contracts';

const mintScript = Script.fromJson(MintScriptJson);

export const Mint = new ExecutableScript(mintScript);

export const mintToken = async (
  signerProvider,
  marvelPunksCollection,
  nftUri,
  account,
) => {
  try {
    // const nodeProvider = new NodeProvider('https://node.testnet.alephium.org');
    // const builder = TransactionBuilder.from(
    //   'https://node.testnet.alephium.org',
    // );

    // const buildTxResult = await builder.buildExecuteScriptTx(
    //   {
    //     signerAddress: account.address,
    //     bytecode: stringToHex(
    //       '0101030001000f13c40de0b6b3a76400001700b47a1600a2{1}0da3{1}0d0d{0}010418',
    //     ),
    //     gasEstimationMultiplier: 1.05,
    //   },
    //   account.publicKey,
    // );

    // console.log({ buildTxResult });

    const result = await Mint.execute(signerProvider, {
      initialFields: {
        marvelPunksCollection,
        nftUri,
        totalSupply: 1000,
        nftTemplateId: '12',
      },
      gasAmount: DEFAULT_GAS_AMOUNT,
      attoAlphAmount: ONE_ALPH * 2n,
      tokens: [
        {
          id: ALPH_TOKEN_ID,
          amount: DUST_AMOUNT,
        },
      ],
    });
    console.log({ result });
    return result;
  } catch (e) {
    console.log({ e });
  }
};
