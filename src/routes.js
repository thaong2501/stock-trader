import Home from "./components/Home.vue";
import Portfolio from "./components/portfolio/Portfolio.vue";
import Stocks from "./components/stocks/Stocks.vue";
import Signup from "./components/auth/Signup.vue";
import Signin from "./components/auth/Signin.vue";

import store from "./store/store";

export const routes = [
  { path: "/", component: Home },
  {
    path: "/portfolio",
    component: Portfolio,
    beforeEnter(to, from, next) {
      if (store.state.auth.tokenId) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  { path: "/stocks", component: Stocks },
  { path: "/signup", component: Signup },
  { path: "/signin", component: Signin },
];
