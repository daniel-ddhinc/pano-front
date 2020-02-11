<template>
  <div class="content">
    <div class="signin-message subtitle-2">
      <b class="font-weight-black">Sign into</b> your DDHAIM PANO account
    </div>
    <div class="subtitle">
      <span class="higlight-text">Signup</span>
      <span class="pl-1">Form</span>
    </div>
    <v-form v-model="valid" @submit.prevent="signup(form)">
      <v-text-field v-model="form.hospital" label="Hospital" filled />
      <v-text-field
        v-model="form.email"
        label="Email"
        autocomplete="email"
        filled
        :rules="rules.emailRules"
      />
      <v-text-field
        v-model="form.password"
        :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        autocomplete="password"
        label="Password"
        filled
      />
      <v-text-field
        v-model="form.password2"
        :type="show2 ? 'text' : 'password'"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show2 = !show2"
        autocomplete="password"
        label="Password Confirmation"
        filled
        :rules="rules.passwordConfirm"
      />
      <a href="#" class="text-right">Forgot Password?</a>
      <v-btn :disabled="!valid" color="success" large class="my-6" type="submit"
        >Signup</v-btn
      >
      <router-link to="login" class="text-center"
        >Do you have an Account? <b>Login now!</b></router-link
      >
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        hospital: "",
        email: "",
        password: "",
        password2: ""
      },
      valid: false,
      show1: false,
      show2: false,
      rules: {
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordConfirm: [
          v => !!v || "Confirm password",
          v => v === this.form.password || "Passwords do not match"
        ]
      }
    };
  },
  methods: {
    ...mapActions(["auth/signup"])
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
