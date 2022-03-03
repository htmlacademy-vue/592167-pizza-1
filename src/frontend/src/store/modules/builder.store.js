import pizza from "@/static/pizza.json";
import {
  prepareDough,
  prepareIngrediensts,
  prepareSauces,
  prepareSizes,
} from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    dough: "",
    sauce: "",
    pizzaSize: "",
    pizzaName: "",
    sum: 0,
    ingredients: [],
    doughs: [],
    sauces: [],
    pizzaSizes: [],
    selectedIngredients: {},
  },

  getters: {
    ingredients({ ingredients }) {
      return prepareIngrediensts(ingredients);
    },
    selectedIngredients({ selectedIngredients }) {
      return selectedIngredients;
    },
    sauces({ sauces }) {
      return prepareSauces(sauces);
    },
    sauce({ sauce }) {
      return sauce;
    },
    doughs({ doughs }) {
      return prepareDough(doughs);
    },
    dough({ dough }) {
      return dough;
    },
    pizzaSizes({ pizzaSizes }) {
      return prepareSizes(pizzaSizes);
    },
    pizzaSize({ pizzaSize }) {
      return pizzaSize;
    },
  },

  actions: {
    async init({ commit }) {
      commit("DEFAULT_VALUE");
    },
  },

  mutations: {
    DEFAULT_VALUE(state) {
      state.ingredients = pizza.ingredients;
      state.dough = "light";
      state.sauce = "tomato";
      state.pizzaSize = "small";
      state.doughs = pizza.dough;
      state.sauces = pizza.sauces;
      state.pizzaSizes = pizza.sizes;
    },
  },
};
