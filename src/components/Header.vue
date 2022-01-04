<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Stock Trader</router-link>
        <span class="d-block navbar-toggler-icon" @click="isNavBarOpen = !isNavBarOpen"
        ref="navBtn"></span>
      </button>
      <div class="navbar-collapse" v-show="isNavBarOpen">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link to="/stocks" active-class="active" class="nav-link"
            >Stocks</router-link
          >
          <router-link class="nav-link" to="/portfolio" active-class="active"
            >Portfolio</router-link
          >
        </ul>
        <ul
          class="
            navbar-nav
            me-auto
            mb-2 mb-lg-0
            justify-content-end
            align-items-center
            w-100
          "
        >
          <li class="nav-item">
            <a class="nav-link active" href="#" @click="randomizeStocks">End Day</a>
          </li>
          <span class="ms-3 text-end me-4">
            Funds: 
            <strong v-if="isAuthenticated">{{ funds | currency }}</strong>
            <strong v-else>$0</strong>
          </span>
          <router-link to="/signup" v-if="!isAuthenticated">
            <button class="btn btn-success mx-2">Sign Up</button>
          </router-link>
          <router-link to="/signin">
            <button class="btn btn-secondary" v-if="!isAuthenticated">Sign In</button>
          </router-link>
          <button class="btn btn-secondary" v-if="isAuthenticated" @click="onLogout">Log Out</button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Singup from "./auth/Signup.vue"
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from 'axios'
export default {
  components: {
    appSignup: Singup
  },
  data() {
    return {
      isNavBarOpen: false,
    };
  },
  computed: {
    ...mapGetters(["funds", "isAuthenticated"]),
  },
  created() {
    window.addEventListener("click", this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.checkClickOn);
  },
  methods: {
    ...mapActions(["randomizeStocks", "logout"]),
    checkClickOn(event) {
      if (event.target != this.$refs.navBtn) {
        this.isNavBarOpen = false;
      }
    },
    onLogout() {
      this.logout()
    }
  },
};
</script>

<style>
.navbar {
  padding: 10px 0;
  box-shadow: 0px 5px 20px 2px #eee;
}
.navbar-brand {
  font-weight: 500;
  font-size: 1.6rem;
  position: relative;
  top: -2px;
}

.modal-dialog {
  margin-top: 100px;
}

@media (min-width: 992px) { 
  .navbar-toggler-icon {
    display: none !important;;
  }
}
</style>
