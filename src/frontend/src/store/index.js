import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({
  users: [],
});

export default new Vuex.Store({
  state,
  plugins: [VuexPlugins],
  modules,
});
