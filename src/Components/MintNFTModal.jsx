import {
  DEFAULT_GAS_AMOUNT,
  MINIMAL_CONTRACT_DEPOSIT,
  web3,
} from '@alephium/web3';
import { useWallet } from '@alephium/web3-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { MarvelPunksCollection } from '../alephium/artifacts/ts';

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

export default ({ isOpen, onOpenChange, trigger }) => {
  web3.setCurrentNodeProvider('https://node.testnet.alephium.org');

  const [error, setError] = useState('');

  const [uploading, setUploading] = useState(false);

  const { connectionStatus, signer, account } = useWallet();
  const wallet = useWallet();

  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [preview, setPreview] = useState(null);

  const uploadToPinata = async file => {
    setUploading(true);

    try {
      let data = new FormData();
      data.append('file', file);

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_KEY,
          },
        },
      );

      const { IpfsHash } = response.data;
      setError('');
      return IpfsHash;
      // mintNFT(pinataHash, name);
    } catch (e) {
      toast.error("Couldn't upload to pinata, please try again." + e);
    }
    setUploading(false);
  };

  const handleClickMintNow = async () => {
    try {
      console.log({ wallet });

      // const addressState = await wallet.nodeProvider.fetchNFTCollectionMetaData(
      //   'df3550a24f10ff8574ce0a97ca3b73068778499f64addb2c0fe0bb39433f5601',
      // );

      // console.log({ addressState });

      if (window.alph) {
        toast.error('Alephium wallet is not installed.');
        return;
      } else {
        if (connectionStatus !== 'connected') {
          toast.error('Alephium wallet is not connected.');
          return;
        }
      }

      if (name && file) {
        // Uploading

        // const pinataHash = await uploadToPinata(file);

        // Mint Now function
        // const contractAddress =
        //   marvelPunksCollectionConfig.marvelPunksCollectionAddress;
        const contractAddress = '29iGBUG316WmfyxWpQ6oaiA6qgDNhJ19Y9kzFnKNpEsbn'; // Deployed by Account 1, Group 1
        // const contractAddress = '28JZ1jeMAiVPFggncA1cGu1cRfzwFm8pGFjT2T6uqBnV5'; // Deployed by Account 5, Group 0
        const contractId =
          'df3550a24f10ff8574ce0a97ca3b73068778499f64addb2c0fe0bb39433f5601';

        // CONTRACT SCRIPT METHOD
        // try {
        //   mintToken(
        //     signer,
        //     contractId,
        //     stringToHex(
        //       `https://amaranth-cold-cheetah-718.mypinata.cloud/ipfs/`,
        //     ),
        //   );
        // } catch (error) {
        //   console.log(error);
        // }
        // CONTRACT INSTANCE Method
        try {
          const marvelPunkCollection =
            MarvelPunksCollection.at(contractAddress);
          console.log('Contract address', marvelPunkCollection.address);
          const state = await marvelPunkCollection.fetchState({});
          console.log('Contract State', state);
          const index = await marvelPunkCollection.groupIndex;
          console.log('Group Index', index.toString());
          const totalSupply = await marvelPunkCollection.view.totalSupply({
            groupIndexOfTransaction: 1,
            signer,
            attoAlphAmount: MINIMAL_CONTRACT_DEPOSIT,
            gasAmount: DEFAULT_GAS_AMOUNT,
          });
          console.log('Total Supply', totalSupply);
          // const resp = await marvelPunkCollection.transact.mint({
          //   args: {
          //     nftUri: stringToHex(`NFT_URI`),
          //   },
          //   signer,
          //   attoAlphAmount: ONE_ALPH * 2n,
          //   gasAmount: DEFAULT_GAS_AMOUNT * 4,
          // });
          // console.log('Contract Response', resp);
        } catch (error) {
          console.log(error);
        }
        // NODE PROVIDER Method
        // const retryFetch = fetchRetry.default(fetch, {
        //   retries: 10,
        //   retryDelay: 1000,
        // });
        // const nodeProvider = new NodeProvider(
        //   'https://node.testnet.alephium.org',
        //   undefined,
        //   retryFetch,
        // );
        // console.log('--NodeProvider', nodeProvider);
        // try {
        //   const result =
        //     await nodeProvider.contracts.postContractsMulticallContract({
        //       calls: [
        //         {
        //           // interestedContracts: contractAddress,
        //           address: tokenIdFromAddress(contractAddress),
        //           group: 1,
        //           callerAddress: account.address,
        //           methodIndex: 0,
        //           args: {
        //             nftUri: `TOKEN_URI`,
        //           },
        //         },
        //       ],
        //     });
        //   console.log('---------------', result);
        // } catch (error) {
        //   console.log(error);
        // }
      } else {
        toast.error('Both name and file is required!');
      }
    } catch (e) {
      console.log({ e });
      toast.error('Minting failed due to an unknown error.');
    }
  };

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null); // Reset preview if no file is selected
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Mint Now</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add a name and image for your new NFT.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input
              className="Input"
              id="name"
              defaultValue="Pedro Duarte"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="fileInput">
              File
            </label>
            <input
              className="Input"
              id="fileInput"
              type="file"
              accept="image/*" // Ensure that only image files can be selected
              onChange={handleFileChange}
            />
          </fieldset>

          {file && (
            <div>
              <p style={{ textAlign: 'center' }}>File name: {file.name}</p>
            </div>
          )}

          {preview && (
            <div>
              <img
                src={preview}
                alt="Preview"
                style={{
                  display: 'block',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  width: '200px',
                  height: 'auto',
                  marginTop: '10px',
                }}
              />
            </div>
          )}
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            {/* <Dialog.Close asChild> */}
            <button className="Button green" onClick={handleClickMintNow}>
              Mint Now
            </button>
            {/* </Dialog.Close> */}
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
