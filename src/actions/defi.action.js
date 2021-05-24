import { services } from "../services";

function getDefiCategoriesList(data) {
  return {
    type: "FETCH_CATEGORIES", // dispatch user login event
    data: data,
  };
}

function getProjectList(data) {
  return {
    type: "FETCH_PROJECT_LIST", // dispatch user login event
    data: data,
  };
}

function getSocialData(data) {
  return {
    type: "SOCIAL_DATA", // dispatch user login event
    data: data,
  };
}

function getDefiLendingList(data) {
  return {
    type: "FETCH_DEFI_LENDING_LIST", // dispatch user login event
    data: data,
  };
}
function fetchFearNGreedIndex(data) {
  return {
    type: "FETCH_FEAR_N_GREED_INDEX", // dispatch user login event
    data: data,
  };
}
function fetchDuneAnalytics(data) {
  return {
    type: "FETCH_DUNE_ANALYTICS", // dispatch user login event
    data: data,
  };
}
function fetchSelectedProjectDetails(data) {
  return {
    type: "FETCH_SELECTED_PROJECT_DETAILS", // dispatch user login event
    data: data,
  };
}

function fetchProjectGraph(data) {
  return {
    type: "FETCH_PROJECT_GRAPH", // dispatch user login event
    data: data,
  };
}
function fetchPriceTrendGraph(data) {
  return {
    type: "FETCH_PRICE_TREND_GRAPH", // dispatch user login event
    data: data,
  };
}
function fetchTweetAnalysis(data) {
  return {
    type: "FETCH_TWEET_ANALYSIS", // dispatch user login event
    data: data,
  };
}
function fetchDefiGraphData(data) {
  return {
    type: "FETCH_DEFI_GRAPH_DATA", // dispatch user login event
    data: data,
  };
}

function fetchUserMetamaskTotalBalances(data) {
  return {
    type: "FETCH_USER_METAMASK_TOTAL_BALANCES",
    data: data,
  };
} // dispatch user login event
function getThirdPartyList(data) {
  return {
    type: "THIRD_PARTY_DEFI_LIST",
    data: data,
  };
}

function setData(data, type) {
  return {
    type: type,
    data: data,
  };
}

// get defi categories
function getDefiCategories() {
  return (dispatch) => {
    const url = "/api/v1/project/categories";

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(getDefiCategoriesList(promise.data.data));
      } else {
        //   handle the error
        // errorHandler(promise);
      }
    });
  };
}

function getProject(category, limit) {
  return (dispatch) => {
    let url = "api/v1/project/fetch";
    if (category) url += `?category=${category}`;
    if (limit) url += (category ? `&` : `?`) + `limit=${limit}`;
    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(getProjectList(promise.data.data));
      } else {
        // console.log("erroer");
      }
    });
  };
}

function getDefiLending() {
  return (dispatch) => {
    const url = "api/v1/project/fetch?category=lending";

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(getDefiLendingList(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}
function getFearNGreedIndex(limit) {
  return (dispatch) => {
    const url = `https://api.alternative.me/fng/?limit=${limit}`;

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(fetchFearNGreedIndex(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}
function getDuneAnalytics(limit) {
  return (dispatch) => {
    const url = `api/v1/duneAnalytics/list`;

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(fetchDuneAnalytics(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}
function getSelectedProjectDetails(projectName) {
  return (dispatch) => {
    const url = `api/v1/project/fetchDefiDetails?projectId=${projectName}`;

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(fetchSelectedProjectDetails(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}

function getProjectGraph(projectId, limit) {
  return (dispatch) => {
    const url = `/api/v1/project/tvlGraph?projectId=${projectId}&days=${limit}`;

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(fetchProjectGraph(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}
function getPriceTrendGraph(projectId, days) {
  return (dispatch) => {
    let url = `/api/v1/project/fetchHistoricalData?projectId=${projectId}`;
    if (days) url += `&days=${days}`;

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(fetchPriceTrendGraph(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}
function getTweetAnalysis(projectId) {
  return (dispatch) => {
    const url = `/api/v1/tweets/fetchAnalysis?id=${projectId}`;

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(fetchTweetAnalysis(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}
function getDefiGraphData(categoryName, limit) {
  return (dispatch) => {
    const url = `api/v1/defi/getDefiGraphData?category=${categoryName}&days=${limit}
    `;

    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(fetchDefiGraphData(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}

function getThirdPartyDefiList(risk, limit) {
  return (dispatch) => {
    let url = `api/v1/defi/list`;

    if (risk) {
      url += `?risk=${risk}`;
    }

    if (limit) {
      url += `?limit=${limit}`;
    }
    dispatch(getThirdPartyList([]));
    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(getThirdPartyList(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}

function getUserMetamaskTotalBalances(currency, address) {
  // const address = "0xC8491952123912357FAc1bB54d78Fe20F4726bcd";
  return (dispatch) => {
    let tokenAddresses = [],
      tokenBalances = null,
      tokenPrices = null,
      totalBalance = 0;
    const tokenBalanceURL = `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-pMxce-diJxbdE-WjmEC`;
    const tokenBalanceResponse = services.get(tokenBalanceURL);
    tokenBalanceResponse.then((promise) => {
      if (promise.status === 200) {
        tokenBalances = promise.data;
        tokenAddresses = promise.data.tokens?.map(
          ({ tokenInfo }) => tokenInfo.address
        );
        let tokenPricesURL = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses?.join(
          "%2C"
        )}&vs_currencies=usd`;
        let tokenPricesResponse = services.get(tokenPricesURL);
        tokenPricesResponse.then((promise) => {
          if (promise.status === 200) {
            tokenPrices = promise.data;
            tokenPrices = Object.entries(tokenPrices);

            for (let i = 0; i < tokenPrices.length; i++) {
              for (let j = 0; j < tokenAddresses.length; j++) {
                if (tokenPrices[i][0] == tokenAddresses[j]) {
                  totalBalance +=
                    (tokenBalances.tokens[j].balance /
                      10 ** tokenBalances.tokens[j].tokenInfo.decimals) *
                    tokenPrices[i][1].usd;
                }
              }
            }

            totalBalance =
              totalBalance +
              tokenBalances.ETH.balance * tokenBalances.ETH.price.rate;
            dispatch(fetchUserMetamaskTotalBalances(totalBalance));
          } else {
            console.log("erroer");
          }
        });
      } else {
        console.log("error");
      }
    });
    // const tokens = data ?data.data.tokens:null;
  };
}

function getSocialLinks(risk, limit) {
  return (dispatch) => {
    let url = `api/v1/social/list`;
    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(getSocialData(promise.data.data));
      } else {
        console.log("erroer");
      }
    });
  };
}

function getAccessibility(value) {
  return (dispatch) => {
    // if (value) {
    dispatch(setData(value, "USER_ACCESSIBLITY"));
    // }
  };
}
function getNullStakingPool() {
  return (dispatch) => {
    let url = `api/v1/bonfi/list`;
    const response = services.get(url);
    response.then((promise) => {
      if (promise.status === 200) {
        dispatch(setData(promise.data.data, "NULL_STAKING_POOL"));
      } else {
        console.log("erroer");
      }
    });
  };
}
function setMMWindowStatus(status) {
  return (dispatch) => {
    dispatch(setData(status, "MM_WINDOW_STATUS"));
  };
}

export const defiActions = {
  setMMWindowStatus,
  getNullStakingPool,
  getDefiCategories,
  getProject,
  getDefiLending,
  getFearNGreedIndex,
  getDuneAnalytics,
  getSelectedProjectDetails,
  getProjectGraph,
  getPriceTrendGraph,
  getTweetAnalysis,
  getDefiGraphData,
  getUserMetamaskTotalBalances,
  getThirdPartyDefiList,
  getSocialLinks,
  getAccessibility,
};
