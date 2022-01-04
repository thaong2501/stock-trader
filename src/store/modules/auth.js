import axios from "axios";
import { router } from "../../main";

const state = {
  tokenId: null,
  userId: null,
};

const mutations = {
  AUTH_USER(state, authData) {
    state.tokenId = authData.tokenId;
    state.userId = authData.userId;
  },
  CLEAR_AUTH_DATA(state) {
    state.tokenId = null;
    state.userId = null;
  },
};

const actions = {
  signup({ commit, dispatch }, authData) {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOM64A2sSYBZzEHPlG7uQcYxpbirdY7As",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        commit("AUTH_USER", {
          tokenId: response.data.idToken,
          userId: response.data.localId,
        });
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("expiresIn", expirationDate);
        dispatch("setFunds");
        dispatch("setPortfolio");
        dispatch("storeUser", authData);
        dispatch("fetchUser");
        dispatch("setLogoutTimer", response.data.expiresIn);
        router.push("/").catch(() => {});
      });
  },
  signin({ commit, dispatch }, authData) {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOM64A2sSYBZzEHPlG7uQcYxpbirdY7As",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        commit("AUTH_USER", {
          tokenId: response.data.idToken,
          userId: response.data.localId,
        });
        dispatch("setPortfolio");
        dispatch("setFunds");
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("expiresIn", expirationDate);

        dispatch("setLogoutTimer", response.data.expiresIn);

        router.push("/").catch(() => {});
      })
      .catch(() => {
        alert("Incorrect email or password!")
      });
  },
  logout({ commit }) {
    commit("CLEAR_AUTH_DATA");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("funds");
    localStorage.removeItem("expiresIn");
    router.push("/signin").catch(() => {});
  },
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch("logout");
    }, expirationTime * 1000);
  },
  autoLogin({ commit }) {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const expirationDate = localStorage.getItem("expiresIn");
    const now = new Date();
    if (now >= expirationDate) {
      return;
    }
    const userId = localStorage.getItem("userId");
    commit("AUTH_USER", {
      tokenId: token,
      userId: userId,
    });
  },
};

const getters = {
  isAuthenticated(state) {
    return state.tokenId !== null;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
