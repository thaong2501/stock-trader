<template>
  <div class="col-sm-6 col-md-4">
    <div class="card text-dark bg-light mb-3">
      <h5 class="card-header">
        {{ stock.name }}
        <small class="fs-6"
          >(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small
        >
      </h5>
      <div class="card-body d-flex justify-content-between">
        <input
          type="number"
          class="form-control w-75 me-1"
          placeholder="Quantity"
          v-model.number="quantity"
        />
        <button
          class="btn btn-primary"
          @click="sellStocks"
          :disabled="quantity <= 0 || !Number.isInteger(quantity)"
        >
          Sell
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    sellStocks() {
      const order = {
        id: this.stock.id,
        price: this.stock.price,
        quantity: this.quantity,
      };

      this.$store.dispatch("sellStocks", order);
      this.quantity = 0;
    },
  },
};
</script>

<style scoped></style>
