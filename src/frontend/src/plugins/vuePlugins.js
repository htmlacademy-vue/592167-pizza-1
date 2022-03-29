import Vue from "vue";
import JwtService from "@/services/jwt.service";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JwtService,
      },
    });
  },
};

Vue.use(plugins);
