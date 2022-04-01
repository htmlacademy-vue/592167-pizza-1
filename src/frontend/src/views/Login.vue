<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="loginUser">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <app-input
            ref="email"
            v-model="email"
            type="text"
            name="email"
            placeholder="example@mail.ru"
            :error-text="validations.email.error"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <app-input
            ref="pass"
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
            :error-text="validations.password.error"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppInput from "@/common/components/AppInput";
import validator from "@/common/mixins/validator";

export default {
  name: "Login",
  components: { AppInput },
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.email.$refs.input.focus();
  },
  methods: {
    ...mapActions("Auth", ["login"]),

    async loginUser() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }

      await this.login({
        email: this.email,
        password: this.password,
      });

      await this.$router.push("/");
    },
  },
};
</script>
