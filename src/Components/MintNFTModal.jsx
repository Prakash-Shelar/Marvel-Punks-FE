import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import React from 'react';

const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

export default ({ isOpen, onOpenChange, trigger }) => {
  //   const handleNftNameSubmit = () => {
  //     if (nftName.trim()) {
  //       console.log('NFT name submitted:', nftName);
  //       setNftNameEntered(true); // Set to true when the name is entered
  //       setError('');
  //     } else {
  //       toast.error('Please enter a name for the NFT.', {
  //         position: 'top-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //   };

  //   const handleFileUpload = async (e, nftName) => {
  //     try {
  //       setUploading(true);
  //       let data = new FormData();
  //       data.append('file', e.target.files[0]);

  //       const response = await axios.post(
  //         'https://api.pinata.cloud/pinning/pinFileToIPFS',
  //         data,
  //         {
  //           headers: {
  //             'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  //             pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
  //             pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_KEY,
  //           },
  //         },
  //       );

  //       const { IpfsHash } = response.data;
  //       setUploading(false);
  //       setPinataHash(IpfsHash);
  //       setError('');
  //       toast.success('Image Uploaded Successfully!');
  //       mintNFT(pinataHash, nftName);
  //     } catch (e) {
  //       toast.error("Couldn't upload to pinata, please try again." + e);
  //     }
  //   };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input className="Input" id="name" defaultValue="Pedro Duarte" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username
            </label>
            <input className="Input" id="username" defaultValue="@peduarte" />
          </fieldset>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
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
