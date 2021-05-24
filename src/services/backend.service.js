import axios from "../config";
import { web3 } from "../web3";
// import userBalancesContract from "../contracts/userBalances/userBalances";
// import tokens from "../tokens.json";
// import { param } from "jquery";

export const backendServices = {
  get,
  post,
  put,
  getWeb3,
  getUserBalances,
};

async function post(url, parameters) {
  const header = {
    "content-type": "application/json",
  };
  try {
    const response = await axios.post(url, parameters, { headers: header });
    return response;
  } catch (error) {
    return error;
  }
}

async function get(url) {
  const header = {
    "content-type": "application/json",
  };
  try {
    const response = await axios.get(url, { headers: header });
    return response;
  } catch (error) {
    return error;
  }
}

async function put(url, parameters) {
  const header = {
    "content-type": "application/json",
  };
  try {
    const response = await axios.put(url, parameters, { headers: header });
    return response;
  } catch (error) {
    return error;
  }
}

let web3Data = {
  isLoggedIn: false,
  accounts: [],
};

async function getWeb3(val) {
  if (web3) {
    try {
      let web3Data = {
        isLoggedIn: false,
        accounts: [],
      };
      const responseData = await web3.eth.getAccounts();

      if (responseData.length) {
        web3Data.isLoggedIn = true;
        web3Data.accounts = responseData;
        return web3Data;
      } else {
        return web3Data;
      }
    } catch {
      return web3Data;
    }
  }
}

async function getUserBalances(userAddress) {
  try {
    const data = await get(
      `https://api.ethplorer.io/getAddressInfo/${userAddress}?apiKey=EK-pMxce-diJxbdE-WjmEC`
    );

    const tokenAddresses = data.data.tokens
      ? data.data.tokens.map(({ tokenInfo }) => tokenInfo.address)
      : [];
    const tokens = data ? data.data.tokens : null;
    let url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses.join(
      "%2C"
    )}&vs_currencies=usd`;
    let tokenMarketPrices = [];
    // tokenLogos = [];
    if (tokenAddresses) tokenMarketPrices = await get(url);

    const obj = { address: tokenAddresses };
    // if (tokenAddresses)
    //   tokenLogos = await post("api/v1/coin/list", JSON.stringify(obj));

    tokenMarketPrices = Object.entries(tokenMarketPrices.data);
    let userBalances = [];
    const ethBalance = {
      symbol: "ETH",
      tokenMarketPrice: data.data.ETH.price.rate,
      userBalance: data.data.ETH.balance,
      tokenAddress: "0x0000000000000000000000000000000000000000",
      image:
        "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    };
    userBalances.push(ethBalance);
    // console.log(tokens, tokens.length, tokenMarketPrices, tokenLogos);
    for (let i = 0; i < tokenMarketPrices.length; i++) {
      console.log("first", i);
      for (let j = 0; j < tokens.length; j++) {
        if (
          tokenMarketPrices[i][0].toLocaleLowerCase() ===
          tokens[j].tokenInfo.address.toLocaleLowerCase()
        ) {
          const obj = {
            symbol: tokens[j].tokenInfo.symbol,
            tokenMarketPrice: tokenMarketPrices[i][1].usd,
            userBalance: tokens[j].balance / 10 ** tokens[j].tokenInfo.decimals,
            tokenAddress: tokens[j].tokenInfo.address,
            // image: tokenLogos.data.data[i].image.large,
            image: `${
              tokens[j].tokenInfo.image
                ? "https://ethplorer.io" + tokens[j].tokenInfo.image
                : "https://res.cloudinary.com/bnfdao/image/upload/v1613460589/BONFI%20/error_ssezyh.png"
            }`,
          };
          console.log("token bal", userBalances);
          userBalances.push(obj);
        }
      }
    }
    console.log("token bal", userBalances);
    return userBalances;
  } catch (error) {
    console.log("error", error);
    if (error.code === -32002) {
      return false;
    }
    return [];
  }
}
