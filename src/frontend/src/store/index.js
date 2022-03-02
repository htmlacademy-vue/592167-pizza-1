import Vue from "vue";
import Vuex from "vuex";
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import modules from "@/store/modules";

Vue.use(Vuex);

const state = () => ({
  misc,
  user,
  doughSize: "light",
  sauceInfo: "tomato",
  pizzaDiameter: "small",
  pizzaName: "",
  sum: 0,
  ingredients: [],
  selectedIngredients: {},
});

export default new Vuex.Store({
  state,
  modules,
});
