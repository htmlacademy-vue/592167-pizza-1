import { prepareAdditionals, preparePizzaInfo } from "@/common/helpers";
import misc from "@/static/misc.json";

const DICTIONARES = {
  additionals: [],
};

export default {
  namespaced: true,
  state: {
    pizzas: [],
    selectedAdditional: {},
    receivingOrder: "",
    phone: "",
    address: {},
    totalPrice: 0,
  },

  getters: {
    pizzas({ pizzas }) {
      return preparePizzaInfo(pizzas);
    },
    totalPrice({ pizzas }) {
      let totalPrice = 0;
      if (pizzas.length > 0) {
        for (const pizza of pizzas) {
          totalPrice += pizza.sum * pizza.count;
        }
      }
      return totalPrice;
    },
    additionals() {
      return prepareAdditionals(DICTIONARES.additionals);
    },
  },

  actions: {
    initDefaultValue({ commit }) {
      commit("DEFAULT_VALUE");
    },
    addPizza({ commit }, pizza) {
      commit("ADD_PIZZA", pizza);
    },
    changePizzaCount({ commit }, data) {
      commit("CHANGE_PIZZA_COUNT", data);
    },
  },

  mutations: {
    DEFAULT_VALUE() {
      DICTIONARES.additionals = misc;
    },
    ADD_PIZZA(state, pizza) {
      state.pizzas.push(pizza);
    },
    CHANGE_PIZZA_COUNT({ pizzas }, data) {
      const pizza = pizzas.find((it) => it.pizzaName === data.name);
      pizza.count = data.count;
    },
  },
};
