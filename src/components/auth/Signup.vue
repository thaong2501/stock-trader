<template>
  <div>
    <h2 class="text-center">Sign Up</h2>
    <form>
      <div class="mb-3">
        <label for="full-name" class="col-form-label">Full name</label>
        <input
          type="text"
          class="form-control"
          id="full-name"
          v-model="fullname"
        />
      </div>
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
      <div class="mb-3">
        <label for="confirm-password" class="col-form-label"
          >Confirm password</label
        >
        <input
          type="password"
          class="form-control"
          id="confirm-password"
          v-model="confirmPassword"
          disabled
        />
      </div>
      <div class="mt-4 text-center">
        <button class="btn btn-secondary" @click.prevent="submitSignup">
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      id: Date.now(),
      funds: 1000,
    };
  },
  methods: {
    submitSignup() {
      const formData = {
        id: this.id,
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        funds: this.funds,
      };
      this.$store.dispatch("signup", formData);
    },
  },
};
</script>
