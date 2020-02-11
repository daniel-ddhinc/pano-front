<template>
  <div class="content">
    <div class="signin-message subtitle-2">
      <b class="font-weight-black">Sign into</b> your DDHAIM PANO account
    </div>
    <div class="subtitle">
      <span class="higlight-text">Login</span>
      <span class="pl-1">Form</span>
    </div>
    <v-form v-model="valid" @submit.prevent="login(form)">
      <v-text-field
        v-model="form.email"
        label="Email"
        filled
        autocomplete="email"
        :rules="rules.emailRules"
      />
      <v-text-field
        v-model="form.password"
        label="Password"
        :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        filled
        autocomplete="password"
        :rules="rules.passwordRules"
      />
      <a href="#" class="text-right">Forgot Password?</a>
      <v-btn color="success" large class="my-6" type="submit" :disabled="!valid"
        >Login</v-btn
      >
      <router-link to="/register" class="text-center"
        >Don't have an account? <b>Sign up</b></router-link
      >
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      show1: false,
      rules: {
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [v => !!v || "Password is required"]
      },
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["auth/login"])
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.subtitle {
  padding-top: 48px;
  span {
    border-bottom: 4px solid white;
    color: #fff;
  }
}
.signin-message {
  color: hsla(0, 0%, 100%, 0.6);
}
.higlight-text {
  font-weight: bold;
}
.v-form {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  width: 420px;
}
</style>
