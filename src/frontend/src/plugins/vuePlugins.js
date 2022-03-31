import Vue from "vue";
import JwtService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";
import Notifier from "@/plugins/notifier";
import store from "@/store";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JwtService,
        $notifier: () => new Notifier(store),
        $api() {
          return createResources();
        },
      },
    });
  },
};

Vue.use(plugins);
