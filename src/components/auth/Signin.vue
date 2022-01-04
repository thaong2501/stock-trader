<template>
  <div>
    <h2 class="text-center">Sign In</h2>
    <form>
      <div class="mb-3">
        <label for="email" class="col-form-label">Email</label>
        <input type="mail" class="form-control" id="email" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="password" class="col-form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
        />
      </div>
      <div class="mt-4 text-center">
        <button class="btn btn-success" @click.prevent="submitSignin">Sign in</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "thaocute@mail.com",
      password: "123456",

      id: Date.now(),
      name: 'Lorem4',
      price: 500,
    };
  },
  methods: {
    submitSignin() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("signin", {
        email: formData.email,
        password: formData.password,
      });
    },
  },
};
</script>
