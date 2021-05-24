export function fetchNetworkId(state = null, action) {
  switch (action.type) {
    case "FETCH_NETWORK_ID":
      return action.data;
    default:
      return state;
  }
}
export function fetchNFTContractInstance(state = null, action) {
  switch (action.type) {
    case "NFT_CONTRACT_INSTANCE":
      return action.data;
    default:
      return state;
  }
}
