import {
  calcSumPizza,
  prepareDough,
  prepareIngredients,
  prepareSauces,
  prepareSizes,
} from "@/common/helpers";
import { MIN_INGREDIENT_COUNT } from "@/constants";

const DICTIONARIES = {
  ingredients: [],
  doughs: [],
  sauces: [],
  pizzaSizes: [],
};

export default {
  namespaced: true,
  state: {
    doughId: 1,
    sauceId: 1,
    pizzaSizeId: 1,
    pizzaName: "",
    sum: 0,
    selectedIngredients: [],
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

    sauceId({ sauceId }) {
      return sauceId;
    },

    doughs({ doughs }) {
      return prepareDough(doughs);
    },

    doughId({ doughId }) {
      return doughId;
    },

    pizzaSizes({ pizzaSizes }) {
      return prepareSizes(pizzaSizes);
    },

    pizzaSizeId({ pizzaSizeId }) {
      return pizzaSizeId;
    },

    pizzaSum({
      selectedIngredients,
      doughId,
      sauceId,
      pizzaSizeId,
      ingredients,
      pizzaSizes,
      doughs,
      sauces,
    }) {
      const pizza = {
        ingredients: selectedIngredients,
        doughId,
        sauceId,
        sizeId: pizzaSizeId,
      };
      return calcSumPizza(pizza, ingredients, pizzaSizes, doughs, sauces);
    },

    pizzaName({ pizzaName }) {
      return pizzaName;
    },

    isButtonCookDisable({ pizzaName, selectedIngredients }) {
      return pizzaName === "" || Object.keys(selectedIngredients).length === 0;
    },

    pizzaInfo({
      doughId,
      sauceId,
      pizzaSizeId,
      pizzaName,
      sum,
      selectedIngredients,
    }) {
      return {
        doughId,
        sauceId,
        pizzaSizeId,
        pizzaName,
        sum,
        selectedIngredients,
      };
    },
  },

  actions: {
    async initBuilderState({ commit }) {
      DICTIONARIES.ingredients = await this.$api.ingredients.get();
      DICTIONARIES.doughs = await this.$api.dough.get();
      DICTIONARIES.sauces = await this.$api.sauces.get();
      DICTIONARIES.pizzaSizes = await this.$api.sizes.get();

      commit("DEFAULT_VALUE");
    },

    resetBuilderState({ commit }) {
      commit("RESET_STATE");
    },

    updateDough({ commit }, doughId) {
      commit("UPDATE_DOUGH", doughId);
    },

    updateSauce({ commit }, sauceId) {
      commit("UPDATE_SAUCE", sauceId);
    },

    updateSize({ commit }, pizzaSizeId) {
      commit("UPDATE_SIZE", pizzaSizeId);
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
      state.doughId = 1;
      state.sauce = 1;
      state.pizzaSizeId = 1;

      state.ingredients = DICTIONARIES.ingredients;
      state.doughs = DICTIONARIES.doughs;
      state.sauces = DICTIONARIES.sauces;
      state.pizzaSizes = DICTIONARIES.pizzaSizes;
    },

    RESET_STATE(state) {
      state.doughId = 1;
      state.sauceId = 1;
      state.pizzaSizeId = 1;
      state.pizzaName = "";
      state.sum = 0;
      state.selectedIngredients = [];
    },

    UPDATE_DOUGH(state, doughID) {
      state.doughId = doughID;
    },

    UPDATE_SAUCE(state, sauceId) {
      state.sauceId = sauceId;
    },

    UPDATE_SIZE(state, pizzaSizeId) {
      state.pizzaSizeId = pizzaSizeId;
    },

    UPDATE_SELECTED_INGREDIENTS(state, data) {
      const ingredient = state.selectedIngredients.find(
        (it) => it.ingredientId === data.ingredientId
      );
      if (ingredient) {
        ingredient.quantity = data.quantity;
      } else {
        state.selectedIngredients.push(data);
      }

      // Удаляем из списка ингредиент, если его количество равно нулю
      if (data.quantity === MIN_INGREDIENT_COUNT) {
        state.selectedIngredients = state.selectedIngredients.filter(
          (it) => it.ingredientId !== data.ingredientId
        );
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
      { doughId, sauceId, pizzaSizeId, pizzaName, sum, selectedIngredients }
    ) {
      state.doughId = doughId;
      state.sauceId = sauceId;
      state.pizzaSizeId = pizzaSizeId;
      state.pizzaName = pizzaName;
      state.sum = sum;
      state.selectedIngredients = selectedIngredients;
    },
  },
};
