<template>
  <div id="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
export default {
  name: "App",
  components: { AppLayout },
  created() {
    this.$store.dispatch("Builder/initBuilderState");
    this.$store.dispatch("Cart/initDefaultValue");
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app";
</style>
