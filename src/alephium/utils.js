import { loadDeployments } from './artifacts/ts/deployments';

function getNetwork() {
  const network = process.env.REACT_APP_PUBLIC_NETWORK ?? 'devnet';
  return network;
}

function getMarvelPunksConfig() {
  const network = getNetwork();
  const marvelPunks =
    loadDeployments(network).contracts.MarvelPunks.contractInstance;
  const groupIndex = marvelPunks.groupIndex;
  const marvelPunksAddress = marvelPunks.address;
  const marvelPunksId = marvelPunks.contractId;

  return { network, groupIndex, marvelPunksAddress, marvelPunksId };
}

function getMarvelPunksCollectionConfig() {
  const network = getNetwork();
  const marvelPunksCollection =
    loadDeployments(network).contracts.MarvelPunksCollection.contractInstance;
  const groupIndex = marvelPunksCollection.groupIndex;
  const marvelPunksCollectionAddress = marvelPunksCollection.address;
  const marvelPunksCollectionId = marvelPunksCollection.contractId;
  return {
    network,
    groupIndex,
    marvelPunksCollectionAddress,
    marvelPunksCollectionId,
  };
}

export const marvelPunksConfig = getMarvelPunksConfig();
export const marvelPunksCollectionConfig = getMarvelPunksCollectionConfig();
