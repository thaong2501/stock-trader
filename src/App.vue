<template>
  <div class="container">
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    appHeader: Header,
  },
  created() {
    this.$store.dispatch("setStocks");
    // this.$store.dispatch("setPortfolio");
    this.$store.dispatch("autoLogin");
  },
  mounted(){
    this.$store.dispatch("storeFunds");
  }
};
</script>

<style>
body {
  font-size: 1.1rem;
}

.dropdown-menu {
  display: block;
}

form {
  width: 50%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 20px 2px #eee;
}

@media (max-width: 1023px) {
  form {
    width: 100%;
  }
}

.slide-enter-active {
  animation: slide-in 0.4s ease forwards;
}

.slide-leave-active {
  animation: slide-out 0.4s ease forwards;
}

@keyframes slide-in {
  from {
    opacity: 0.5;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
