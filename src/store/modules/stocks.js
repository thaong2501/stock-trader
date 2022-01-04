import axios from "axios";

const state = {
  stocks: [],
};

const mutations = {
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
  },
  RANDOM_STOCK(state) {
    state.stocks.forEach((stock) => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  },
};

const actions = {
  setStocks: ({ commit, rootState }) => {
    axios.get("/stocks.json").then((response) => {
      // if (response.data != null) {
      //   const stocksArray = [];
      //   for(let key in response.data) {
      //     stocksArray.push(response.data[key]);
      //   }
      //   commit("SET_STOCKS", stocksArray);
      // }
      if (response.data != null) {
        const stocks = response.data.stocks;
        commit("SET_STOCKS", stocks);
      }
    });
  },
  buyStock: ({ commit }) => {
    commit("BUY_STOCKS");
  },
  randomizeStocks: ({ commit, rootState }) => {
    commit("RANDOM_STOCK");
    const data = {
      stocks: state.stocks,
    };
    axios.put("/stocks.json" + "?auth=" + rootState.auth.tokenId, data);
  },
};

const getters = {
  stocks: (state) => state.stocks,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
