import axios from "axios";

const state = {
  portfolio: [],
};

const mutations = {
  SET_PORTFOLIO(state, portfolio) {
    state.portfolio = portfolio;
  },
};

const actions = {
  setPortfolio({ commit, state }) {
    axios.get("portfolio.json").then((response) => {
      if (response.data != null) {
        const portfolio = response.data;
        commit("SET_PORTFOLIO", portfolio);
      }
    });
  },
  updatePortfolio({ state, rootState }) {
    axios.put(
      "./portfolio.json" + "?auth=" + rootState.auth.tokenId,
      state.portfolio
    );
  },
};

const getters = {
  portfolio(state, getters) {
    return state.portfolio.map((p) => {
      const record = getters.stocks.find((el) => el.id === p.id);
      return {
        id: p.id,
        quantity: p.quantity,
        name: record.name,
        price: record.price,
      };
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
