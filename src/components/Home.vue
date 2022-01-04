<template>
  <div class="card border-success mb-3">
    <div class="card-body text-success py-4">
      <h2 class="card-title">Trade or View your Portfolio</h2>
      <p class="card-text">Click on "End Day" to begin a new Day!</p>
    </div>
    <div class="card-footer bg-transparent border-success fs-4 fw-bold py-4">
      Your Funds:
      <span v-if="isAuthenticated">{{ funds | currency }}</span>
      <span v-else>$0</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["funds", "isAuthenticated"]),
  },
};
</script>

<style scoped></style>
