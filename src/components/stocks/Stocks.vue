<template>
  <div class="row">
    <p class="mb-4">Click on <strong>"End Day"</strong> to begin a new Day!</p>
    <app-stock v-for="stock in stocks" :stock="stock"></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
export default {
  components: {
    appStock: Stock,
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
  },
};
</script>

<style scoped></style>
