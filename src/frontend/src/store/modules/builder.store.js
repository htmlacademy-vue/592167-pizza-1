import pizza from "@/static/pizza.json";
import {
  prepareDough,
  prepareIngrediensts,
  prepareSauces,
  prepareSizes,
} from "@/common/helpers";
import {
  DOUGH_PRICE,
  MIN_INGREDIENT_COUNT,
  SAUCES_PRICE,
  SIZE_MULTIPLIER,
} from "@/constants";

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
    totalPrice({ ingredients, selectedIngredients, dough, sauce, pizzaSize }) {
      // мультипликатор размера х (стоимость теста + соус + ингредиенты)
      let ingredientsPrice = 0;
      const selectedIngredientList = Object.keys(selectedIngredients);
      for (const item of selectedIngredientList) {
        const ingredient = ingredients.find((it) => it.name === item);
        ingredientsPrice += ingredient.price * selectedIngredients[item];
      }
      return (
        SIZE_MULTIPLIER[pizzaSize] *
        (DOUGH_PRICE[dough] + SAUCES_PRICE[sauce] + ingredientsPrice)
      );
    },
  },

  actions: {
    async init({ commit }) {
      commit("DEFAULT_VALUE");
    },

    updateDough({ commit }, dough) {
      commit("UPDATE_DOUGH", dough);
    },

    updateSauce({ commit }, sauce) {
      commit("UPDATE_SAUCE", sauce);
    },

    updateSize({ commit }, pizzaSize) {
      commit("UPDATE_SIZE", pizzaSize);
    },

    updateSelectedIngredients({ commit }, data) {
      commit("UPDATE_SELECTED_INGREDIENTS", data);
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
    UPDATE_DOUGH(state, dough) {
      state.dough = dough;
    },
    UPDATE_SAUCE(state, sauce) {
      state.sauce = sauce;
    },
    UPDATE_SIZE(state, pizzaSize) {
      state.pizzaSize = pizzaSize;
    },
    UPDATE_SELECTED_INGREDIENTS(state, data) {
      state.selectedIngredients = { ...state.selectedIngredients, ...data };
      if (data[Object.keys(data)[0]] === MIN_INGREDIENT_COUNT) {
        delete state.selectedIngredients[Object.keys(data)[0]];
      }
    },
  },
};
