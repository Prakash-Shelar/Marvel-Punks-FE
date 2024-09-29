import { NetworkId } from "@alephium/web3";
import { loadDeployments } from "./artifacts/ts/deployments";

export interface MarvelPunksConfig {
	network: NetworkId;
	groupIndex: number;
	marvelPunksAddress: string;
	marvelPunksId: string;
}

export interface MarvelPunksCollectionConfig {
	network: NetworkId;
	groupIndex: number;
	marvelPunksCollectionAddress: string;
	marvelPunksCollectionId: string;
}

function getNetwork(): NetworkId {
	const network = (process.env.NEXT_PUBLIC_NETWORK ?? "devnet") as NetworkId;
	return network;
}

function getMarvelPunksConfig(): MarvelPunksConfig {
	const network = getNetwork();
	const marvelPunks =
		loadDeployments(network).contracts.MarvelPunks.contractInstance;
	const groupIndex = marvelPunks.groupIndex;
	const marvelPunksAddress = marvelPunks.address;
	const marvelPunksId = marvelPunks.contractId;
    
	return { network, groupIndex, marvelPunksAddress, marvelPunksId };
}

function getMarvelPunksCollectionConfig(): MarvelPunksCollectionConfig {
	const network = getNetwork();
	const marvelPunksCollection =
		loadDeployments(network).contracts.MarvelPunksCollection
			.contractInstance;
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
