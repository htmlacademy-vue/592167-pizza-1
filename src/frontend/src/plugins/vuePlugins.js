import Vue from "vue";
import JwtService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JwtService,
        $api() {
          return createResources();
        },
      },
    });
  },
};

Vue.use(plugins);
