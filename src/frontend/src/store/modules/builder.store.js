import {
  prepareDough,
  prepareIngredients,
  prepareSauces,
  prepareSizes,
} from "@/common/helpers";
import {
  DOUGH_PRICE,
  MIN_INGREDIENT_COUNT,
  SAUCES_PRICE,
  SIZE_MULTIPLIER,
} from "@/constants";

const DICTIONARIES = {
  ingredients: [],
  doughs: [],
  sauces: [],
  pizzaSizes: [],
};

export default {
  namespaced: true,
  state: {
    dough: "",
    sauce: "",
    pizzaSize: "",
    pizzaName: "",
    sum: 0,
    selectedIngredients: {},
    ingredients: [],
    doughs: [],
    sauces: [],
    pizzaSizes: [],
  },

  getters: {
    ingredients({ ingredients }) {
      return prepareIngredients(ingredients);
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

    pizzaSum({ selectedIngredients, dough, sauce, pizzaSize }) {
      // мультипликатор размера х (стоимость теста + соус + ингредиенты)
      let ingredientsPrice = 0;
      const selectedIngredientList = Object.keys(selectedIngredients);
      for (const item of selectedIngredientList) {
        const ingredient = DICTIONARIES.ingredients.find(
          (it) => it.name === item
        );
        ingredientsPrice += ingredient.price * selectedIngredients[item];
      }
      return (
        SIZE_MULTIPLIER[pizzaSize] *
        (DOUGH_PRICE[dough] + SAUCES_PRICE[sauce] + ingredientsPrice)
      );
    },

    pizzaName({ pizzaName }) {
      return pizzaName;
    },

    isButtonCookDisable({ pizzaName, selectedIngredients }) {
      return pizzaName === "" || Object.keys(selectedIngredients).length === 0;
    },

    pizzaInfo({
      dough,
      sauce,
      pizzaSize,
      pizzaName,
      sum,
      selectedIngredients,
    }) {
      return { dough, sauce, pizzaSize, pizzaName, sum, selectedIngredients };
    },
  },

  actions: {
    async initBuilderState({ commit }) {
      const resIngredients = await this.$api.ingredients.get(); //345
      DICTIONARIES.ingredients = resIngredients.slice(0, 15);

      const resDough = await this.$api.dough.get(); //42
      DICTIONARIES.doughs = resDough.slice(0, 2);

      const resSauces = await this.$api.sauces.get(); //42
      DICTIONARIES.sauces = resSauces.slice(0, 2);

      const resSize = await this.$api.sizes.get(); //63
      DICTIONARIES.pizzaSizes = resSize.slice(0, 3);

      commit("DEFAULT_VALUE");
    },

    resetBuilderState({ commit }) {
      commit("RESET_STATE");
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

    updatePizzaName({ commit }, name) {
      commit("UPDATE_PIZZA_NAME", name);
    },

    addSum({ commit }, sum) {
      commit("ADD_SUM", sum);
    },

    changePizza({ commit }, data) {
      commit("CHANGE_PIZZA", data);
    },
  },

  mutations: {
    DEFAULT_VALUE(state) {
      state.dough = "light";
      state.sauce = "tomato";
      state.pizzaSize = "small";

      state.ingredients = DICTIONARIES.ingredients;
      state.doughs = DICTIONARIES.doughs;
      state.sauces = DICTIONARIES.sauces;
      state.pizzaSizes = DICTIONARIES.pizzaSizes;
    },

    RESET_STATE(state) {
      state.dough = "light";
      state.sauce = "tomato";
      state.pizzaSize = "small";
      state.pizzaName = "";
      state.sum = 0;
      state.selectedIngredients = {};
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

    UPDATE_PIZZA_NAME(state, name) {
      state.pizzaName = name;
    },

    ADD_SUM(state, sum) {
      state.sum = sum;
    },

    CHANGE_PIZZA(
      state,
      { dough, sauce, pizzaSize, pizzaName, sum, selectedIngredients }
    ) {
      state.dough = dough;
      state.sauce = sauce;
      state.pizzaSize = pizzaSize;
      state.pizzaName = pizzaName;
      state.sum = sum;
      state.selectedIngredients = selectedIngredients;
    },
  },
};
