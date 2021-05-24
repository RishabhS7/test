// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
// import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

// var metamaskProvider;
// var walletConnectProvider;
let web3 = null;
// const walletConnectProvider = new WalletConnectProvider({
//   infuraId: "de21e440aade484290be1e3c89e67f28",
//   qrcode: false,
// });

const metamaskConnectInit = async () => {
  // Check if Web3 has been injected by the browser (Mist/MetaMask).
  return new Promise(async (resolve, reject) => {
    if (typeof window.web3 !== "undefined") {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(window.web3.currentProvider);
      localStorage.setItem("walletConnect", 0);
      resolve(true);
    } else {
      // Handle the case where the user doesn't have web3. Probably
      // show them a message telling them to install Metamask in
      // order to use the app.
      web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://mainnet.infura.io/v3/de21e440aade484290be1e3c89e67f28"
          // "https://rinkeby.infura.io/v3/de21e440aade484290be1e3c89e67f28"
        )
      );
      reject(false);
    }
  });
};
const naboxConnectInit = async () => {
  // Check if Web3 has been injected by the browser (Mist/MetaMask).
  return new Promise(async (resolve, reject) => {
    if (typeof window.nabox !== "undefined") {
      // Use Mist/MetaMask's provider.
      web3 = window.nabox;
      console.log("tt", window);
      localStorage.setItem("walletConnect", 0);
      resolve(true);
    } else {
      // Handle the case where the user doesn't have web3. Probably
      // show them a message telling them to install Metamask in
      // order to use the app.
      web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://mainnet.infura.io/v3/de21e440aade484290be1e3c89e67f28"
          // "https://rinkeby.infura.io/v3/de21e440aade484290be1e3c89e67f28"
        )
      );
      reject(false);
    }
  });
};

// const walletConnectInit = async () => {
//   localStorage.setItem("walletConnect", 1);
//   walletConnectProvider.enable();
//   web3 = new Web3(walletConnectProvider);
//   if (!walletConnectProvider.connector.connected) {
//     web3 = new Web3(
//       new Web3.providers.HttpProvider(
//         "https://mainnet.infura.io/v3/de21e440aade484290be1e3c89e67f28"
//         // "https://rinkeby.infura.io/v3/de21e440aade484290be1e3c89e67f28"
//       )
//     );
//   }
// };

// const walletConnectModalInit = async () => {
//   return new Promise(async (resolve, reject) => {
//     walletConnectInit();
//     const uri = walletConnectProvider.connector.uri;
//     // console.log(uri);
//     if (!walletConnectProvider.connector.connected) {
//       WalletConnectQRCodeModal.open(uri);
//     } else resolve(true);
//   });
// };

if (!web3) {
  if (Number(localStorage.getItem("walletConnect"))) {
    // walletConnectInit();
  } else metamaskConnectInit();
}

export {
  web3,
  // walletConnectProvider,
  // walletConnectInit,
  metamaskConnectInit,
  // walletConnectModalInit,
  naboxConnectInit,
};
