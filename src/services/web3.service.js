import { web3 } from "../web3";
// import rookieContractABI from "../contracts/rookie.json";
// import tokenContractABI from "../contracts/token.json";

async function getNetworkId() {
  try {
    return await window.ethereum.request({ method: "eth_chainId" });
  } catch (error) {
    return 1;
  }
}

async function enableMetamask() {
  // let ethereum = window.ethereum;
  try {
    await window.ethereum.send("eth_requestAccounts");
    return true;
  } catch (error) {
    if (error.code === -32002) {
      return false;
    }
    return false;
  }
}

async function enableNabox() {
  // let ethereum = window.ethereum;
  console.log("here1");
  try {
    let some = window.nabox
      .createSession({ chain: "Ethereum" })
      .then((res) => {
        console.log("new", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
    console.log("works", some);
    return true;
  } catch (error) {
    if (error) {
      console.log(error);
      return false;
    }
    return false;
  }
}

async function getContractInstance(contractAbi, contractAddress) {
  try {
    if (web3) {
      const contractInstance = await new web3.eth.Contract(
        contractAbi,
        contractAddress
      );
      return contractInstance;
    }
  } catch (error) {
    console.log(error);
  }
}

// async function getRookieContractInstance() {
//   try {
//     if (web3) {
//       const rookieContractInstance = await new web3.eth.Contract(
//         rookieContractABI.contractAbi,
//         rookieContractABI.contractAdress
//       );
//       return rookieContractInstance;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function getTokenContractInstance() {
//   try {
//     if (web3) {
//       const tokenContractInstance = await new web3.eth.Contract(
//         tokenContractABI.contractAbi,
//         tokenContractABI.contractAdress
//       );
//       return tokenContractInstance;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export const web3Services = {
  getNetworkId,
  enableMetamask,
  enableNabox,
  getContractInstance,
};
