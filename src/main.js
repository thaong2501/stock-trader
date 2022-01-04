import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import store from "./store/store";
import axios from "axios";

Vue.use(VueRouter);

axios.defaults.baseURL = 'https://fir-9491b-default-rtdb.firebaseio.com'

Vue.filter("currency", (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
});

export const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
