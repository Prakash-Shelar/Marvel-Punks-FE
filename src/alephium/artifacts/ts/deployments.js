/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { MarvelPunks } from '.';
import { default as devnetDeployments } from '../../deployments/.deployments.devnet.json';
import { default as testnetDeployments } from '../../deployments/.deployments.testnet.json';

function toDeployments(json) {
  const contracts = {
    MarvelPunks: {
      ...json.contracts['MarvelPunks'],
      contractInstance: MarvelPunks.at(
        json.contracts['MarvelPunks'].contractInstance.address,
      ),
    },
  };
  return {
    ...json,
    contracts: contracts,
  };
}

export function loadDeployments(networkId, deployerAddress) {
  const deployments =
    networkId === 'testnet'
      ? testnetDeployments
      : networkId === 'devnet'
      ? devnetDeployments
      : undefined;
  if (deployments === undefined) {
    throw Error('The contract has not been deployed to the ' + networkId);
  }
  const allDeployments = Array.isArray(deployments)
    ? deployments
    : [deployments];
  if (deployerAddress === undefined) {
    if (allDeployments.length > 1) {
      throw Error(
        'The contract has been deployed multiple times on ' +
          networkId +
          ', please specify the deployer address',
      );
    } else {
      return toDeployments(allDeployments[0]);
    }
  }
  const result = allDeployments.find(
    d => d.deployerAddress === deployerAddress,
  );
  if (result === undefined) {
    throw Error('The contract deployment result does not exist');
  }
  return toDeployments(result);
}
