import { services } from "../../services";
let networkId = 1;
async function fetchNetworkId() {
  networkId = await services.getNetworkId();
}
fetchNetworkId();

function getContractAddresses() {
  if (networkId === "0x4" || +networkId === 4)
    return {
      nftContractAddress: "0xFD598d6c35f326B13D5D26402e07a728177B395f",
    };
  else if (+networkId === 1 || networkId === "0x1")
    return {
      nftContractAddress: "0xFD598d6c35f326B13D5D26402e07a728177B395f",
    };
  else
    return {
      nftContractAddress: "0xFD598d6c35f326B13D5D26402e07a728177B395f",
    };
}
export default getContractAddresses;
