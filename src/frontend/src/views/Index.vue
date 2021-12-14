<template>
  <div>
    <Header />
    <Main />
  </div>
</template>

<script>
import misc from "../static/misc.json";
import pizza from "../static/pizza.json";
import user from "../static/user.json";

import Header from "./Header";
import Main from "./Main";

export default {
  name: "Index",
  data() {
    return { misc, pizza, user };
  },
  components: {
    Header,
    Main,
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
