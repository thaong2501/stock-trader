<template>
  <div class="col-sm-6 col-md-4">
    <div class="card text-white bg-success mb-3">
      <h5 class="card-header">
        {{ stock.name }}
        <small class="fs-6">(Price: {{ stock.price }})</small>
      </h5>
      <div class="card-body d-flex justify-content-between">
        <input
          type="number"
          class="form-control w-75 me-1"
          placeholder="Quantity"
          v-model.number="quantity"
        />
        <button
          class="btn btn-light"
          @click="buyStocks"
          :disabled="quantity <= 0 || !Number.isInteger(quantity)"
        >
          Buy
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
    buyStocks() {
      const order = {
        id: this.stock.id,
        price: this.stock.price,
        quantity: this.quantity,
      };
      this.$store.dispatch("buyStocks", order);
      this.quantity = 0;
    },
  },
};
</script>

<style scoped></style>
