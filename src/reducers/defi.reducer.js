export function fetchCategories(state = null, action) {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return action.data;
    default:
      return state;
  }
}

export function fetchProjectList(state = null, action) {
  switch (action.type) {
    case "FETCH_PROJECT_LIST":
      return action.data;
    default:
      return state;
  }
}

export function fetchDefiLendingList(state = [], action) {
  switch (action.type) {
    case "FETCH_DEFI_LENDING_LIST":
      return {
        lendingList: action.data,
      };
    default:
      return state;
  }
}

export function fetchFearNGreedIndex(state = null, action) {
  switch (action.type) {
    case "FETCH_FEAR_N_GREED_INDEX":
      return action.data;
    default:
      return state;
  }
}
export function fetchDuneAnalytics(state = [], action) {
  switch (action.type) {
    case "FETCH_DUNE_ANALYTICS":
      return {
        duneAnalytics: action.data,
      };
    default:
      return state;
  }
}

export function fetchWeb3Data(state = null, action) {
  switch (action.type) {
    case "FETCH_WEB3_DATA":
      return action.data;
    default:
      return state;
  }
}

export function fetchMetamask(state = null, action) {
  switch (action.type) {
    case "FETCH_METAMASK":
      return action.data;
    default:
      return state;
  }
}

export function fetchUserBalances(state = null, action) {
  switch (action.type) {
    case "FETCH_USER_BALANCES":
      return action.data;

    default:
      return state;
  }
}

export function fetchSelectedProjectDetails(state = [], action) {
  switch (action.type) {
    case "FETCH_SELECTED_PROJECT_DETAILS":
      return {
        selectedProjectDetails: action.data,
      };
    default:
      return state;
  }
}

export function fetchProjectGraph(state = [], action) {
  switch (action.type) {
    case "FETCH_PROJECT_GRAPH":
      return {
        projectGraph: action.data,
      };
    default:
      return state;
  }
}
export function fetchPriceTrendGraph(state = [], action) {
  switch (action.type) {
    case "FETCH_PRICE_TREND_GRAPH":
      return {
        priceTrendGraph: action.data,
      };
    default:
      return state;
  }
}
export function fetchTweetAnalysis(state = [], action) {
  switch (action.type) {
    case "FETCH_TWEET_ANALYSIS":
      return {
        tweetAnalysis: action.data,
      };
    default:
      return state;
  }
}
export function fetchDefiGraphData(state = [], action) {
  switch (action.type) {
    case "FETCH_DEFI_GRAPH_DATA":
      return {
        defiGraphData: action.data,
      };
    default:
      return state;
  }
}

export function fetchThirdPartyDefiList(state = null, action) {
  switch (action.type) {
    case "THIRD_PARTY_DEFI_LIST":
      return action.data;
    default:
      return state;
  }
}

export function fetchUserMetamaskTotalBalances(state = null, action) {
  switch (action.type) {
    case "THIRD_USER_METAMASK_TOTAL_BALANCES":
      return action.data;
    default:
      return state;
  }
}

export function getSocialData(state = [], action) {
  switch (action.type) {
    case "SOCIAL_DATA":
      return action.data;
    default:
      return state;
  }
}

export function fetchAccessibility(state = false, action) {
  switch (action.type) {
    case "USER_ACCESSIBLITY":
      return action.data;
    default:
      return state;
  }
}
export function fetchNullStakingPool(state = [], action) {
  switch (action.type) {
    case "NULL_STAKING_POOL":
      return action.data;
    default:
      return state;
  }
}

export function fetchMMWindowStatus(state = {}, action) {
  switch (action.type) {
    case "MM_WINDOW_STATUS":
      return action.data;
    default:
      return state;
  }
}
