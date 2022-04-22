<template>
  <div id="app">
    <app-layout>
      <transition name="slide" mode="in-out">
        <router-view />
      </transition>
    </app-layout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  components: { AppLayout },
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("Builder/initBuilderState");
    this.$store.dispatch("Cart/initDefaultValue");
  },
};
</script>

<style lang="scss">
.slide-enter-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
@import "./assets/scss/app";
</style>
