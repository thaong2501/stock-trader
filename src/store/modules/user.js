import axios from "axios";

const state = {
  funds: null,
};

const mutations = {
  SET_FUNDS(state, funds) {
    state.funds = funds;
  },
};

const actions = {
  setFunds({ commit, rootState }) {
    if (!rootState.auth.tokenId) {
      return;
    }
    axios
      .get("/funds.json")
      .then((response) => {
        if (response.data != null) {
          const funds = response.data.funds;
          localStorage.setItem("funds", funds);
          commit("SET_FUNDS", funds);
        }
      })
      .catch((error) => console.log(error));
  },
  storeFunds({ commit }) {
    const funds = localStorage.getItem("funds");
    commit("SET_FUNDS", funds);
  },
  updateFunds({ commit, rootState }) {
    const data = {
      funds: state.funds,
    };
    axios.put("./funds.json" + "?auth=" + rootState.auth.tokenId, data);
  },
  storeUser({ rootState }, userData) {
    if (!rootState.auth.tokenId) {
      return;
    }
    axios
      .post("/user.json" + "?auth=" + rootState.auth.tokenId, userData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  },
  fetchUser({ commit, rootState }) {
    if (!rootState.auth.tokenId) {
      return;
    }
    axios
      .get("/user.json" + "?auth=" + rootState.auth.tokenId)
      .then((response) => {
        const userArray = [];
        for (let key in response.data) {
          userArray.push(response.data[key]);
        }
        const userEmail = localStorage.getItem("email");
        const user = userArray.find((user) => user.email === userEmail);
        commit("SET_USER", user);
      });
  },
};

const getters = {
  funds(state) {
    return state.funds;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
