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

const setupState = () => ({
  dough: "",
  sauce: "",
  pizzaSize: "",
  pizzaName: "",
  sum: 0,
  selectedIngredients: {},
});

const DICTIONARIES = {
  ingredients: [],
  doughs: [],
  sauces: [],
  pizzaSizes: [],
};

export default {
  namespaced: true,
  state: setupState(),

  getters: {
    ingredients() {
      return prepareIngrediensts(DICTIONARIES.ingredients);
    },

    selectedIngredients({ selectedIngredients }) {
      return selectedIngredients;
    },

    sauces() {
      return prepareSauces(DICTIONARIES.sauces);
    },

    sauce({ sauce }) {
      return sauce;
    },

    doughs() {
      return prepareDough(DICTIONARIES.doughs);
    },

    dough({ dough }) {
      return dough;
    },

    pizzaSizes() {
      return prepareSizes(DICTIONARIES.pizzaSizes);
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

    isPizzaName({ pizzaName }) {
      return pizzaName === "";
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
    initBuilderState({ commit }) {
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

    changePizza({ commit }, data) {
      commit("CHANGE_PIZZA", data);
    },
  },

  mutations: {
    DEFAULT_VALUE(state) {
      state.dough = "light";
      state.sauce = "tomato";
      state.pizzaSize = "small";
      DICTIONARIES.ingredients = pizza.ingredients;
      DICTIONARIES.doughs = pizza.dough;
      DICTIONARIES.sauces = pizza.sauces;
      DICTIONARIES.pizzaSizes = pizza.sizes;
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
