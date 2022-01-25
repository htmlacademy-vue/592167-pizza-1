<template>
  <div>
    <app-layout></app-layout>
    <Main></Main>
  </div>
</template>

<script>
import misc from "../static/misc.json";
import user from "../static/user.json";

import Main from "./Main";
import AppLayout from "../layouts/AppLayout";

export default {
  name: "Index",
  data() {
    return { misc, user };
  },
  components: {
    AppLayout,
    Main,
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
