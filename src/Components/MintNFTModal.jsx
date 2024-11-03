import {
  DEFAULT_GAS_AMOUNT,
  ONE_ALPH,
  stringToHex,
  web3,
} from '@alephium/web3';
import { useWallet } from '@alephium/web3-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { MarvelPunksCollection } from '../alephium/artifacts/ts';
import { WalletContext } from "./WalletContext";

export default ({ isOpen, onOpenChange, trigger }) => {
  const WalletAddress = useContext(WalletContext);
  web3.setCurrentNodeProvider(process.env.REACT_APP_ALEPHIUM_NODE);

  const [uploading, setUploading] = useState(false);

  const [isMinting, setIsMinting] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { connectionStatus, signer, account } = useWallet();

  const [file, setFile] = useState('');
  const [name, setName] = useState('');
  const [preview, setPreview] = useState(null);

  const uploadToPinata = async (file, name) => {
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

      const imageUrl = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;

      // Upload Metadata
      const metadata = {
        name: name,
        image: imageUrl,
        by: WalletAddress.address
      };

      let pinataResponse = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        metadata,
        {
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_KEY,
          },
        },
      );

      const nftUri = `https://yellow-calm-cricket-726.mypinata.cloud/ipfs/${pinataResponse.data.IpfsHash}`;
      return nftUri;
    } catch (e) {
      toast.error("Couldn't upload to pinata, please try again." + e);
    }
    setUploading(false);
  };

  const handleClickMintNow = async () => {
    setIsMinting(true);
    try {
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
        const nftUri = await uploadToPinata(file, name);

        // CONTRACT INSTANCE Method
        try {
          const marvelPunkCollection = MarvelPunksCollection.at(
            process.env.REACT_APP_SMART_CONTRACT_ADDRESS,
          );

          const resp = await marvelPunkCollection.transact.mint({
            args: {
              nftUri: stringToHex(nftUri),
            },
            signer,
            attoAlphAmount: ONE_ALPH * 2n,
            gasAmount: DEFAULT_GAS_AMOUNT * 4,
          });
          console.log('Contract Response', resp);
          toast.success('Minting successful!');
          setDialogOpen(false);
        } catch (error) {
          console.error('Minting failed:', error);
          toast.error('Minting failed! Please try again.');
        }
      } else {
        toast.error('Both name and file is required!');
      }
    } catch (e) {
      console.log({ e });
      toast.error('Minting failed due to an unknown error.');
    } finally {
      setIsMinting(false); // Re-enable button after minting completes
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
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <button
              className="Button green"
              onClick={handleClickMintNow}
              disabled={isMinting}
            >
              {isMinting ? 'Uploading...' : 'Mint Now'}
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
