import { preparePizzaInfo } from "@/common/helpers";
import {
  MIN_INGREDIENT_COUNT,
  MY_FIRST_ADDRESS,
  NEW_ADDRESS,
} from "@/constants";

const DICTIONARIES = {
  additional: [],
};

export default {
  namespaced: true,
  state: {
    pizzas: [],
    selectedAdditional: [],
    receivingOrder: 1,
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    totalPrice: 0,
    additional: [],
  },

  getters: {
    pizzas({ pizzas }, _, rootState) {
      const ingredients = rootState.Builder.ingredients;
      const pizzaSizes = rootState.Builder.pizzaSizes;
      const doughs = rootState.Builder.doughs;
      const sauces = rootState.Builder.sauces;

      return preparePizzaInfo(pizzas, ingredients, pizzaSizes, doughs, sauces);
    },
    totalPrice({ pizzas, selectedAdditional, additional }) {
      let totalPrice = 0;
      if (pizzas.length > 0) {
        pizzas.map((it) => {
          totalPrice += it.sum * it.quantity;
        });
      }
      if (selectedAdditional.length > 0) {
        selectedAdditional.map((it) => {
          const additionalPrice = additional.find(
            (misc) => misc.id === it.miscId
          ).price;
          totalPrice += additionalPrice * it.quantity;
        });
      }
      return totalPrice;
    },
    additional({ additional }) {
      return additional;
    },
    selectedAdditional({ selectedAdditional }) {
      return selectedAdditional;
    },
    receivingOrder({ receivingOrder }) {
      return receivingOrder;
    },
    address({ address }) {
      return address;
    },
    phone({ phone }) {
      return phone;
    },
  },

  actions: {
    async initDefaultValue({ commit }) {
      const resAdditional = await this.$api.misc.get();
      DICTIONARIES.additional = resAdditional.slice(0, 3);

      commit("DEFAULT_VALUE");
    },
    addPizza({ commit }, pizza) {
      commit("ADD_PIZZA", pizza);
    },
    changePizzaCount({ commit }, data) {
      commit("CHANGE_PIZZA_COUNT", data);
    },
    changeSelectedAdditional({ commit }, data) {
      commit("CHANGE_SELECTED_ADDITIONAL", data);
    },
    resetState({ commit }) {
      commit("RESET_STATE");
    },
    addAddress({ commit }, data) {
      commit("ADD_ADDRESS", data);
    },
    addAddressFromUserAddresses({ commit, rootState }, receivingOrder) {
      let address = {
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      if (receivingOrder >= MY_FIRST_ADDRESS) {
        address = rootState.Profile.addresses.find(
          (it) => it.id === +receivingOrder - NEW_ADDRESS
        );
      }
      commit("ADD_ADDRESS", address);
    },
    addPhone({ commit }, phone) {
      commit("ADD_PHONE", phone);
    },
    changeAddressField({ commit }, data) {
      commit("CHANGE_ADDRESS_FIELD", data);
    },
    repeatOrder({ commit }, oldOrder) {
      commit("ADD_PIZZAS", oldOrder.pizzas);
      commit("ADD_SELECTED_ADDITIONAL", oldOrder.selectedAdditional);
      commit("ADD_RECEIVING_ORDER", oldOrder.receivingOrder);
      commit("ADD_PHONE", oldOrder.phone);
      commit("ADD_ADDRESS", oldOrder.address);
      commit("ADD_TOTAL_PRICE", oldOrder.totalPrice);
    },
    changeReceivingOrder({ commit }, data) {
      commit("ADD_RECEIVING_ORDER", data);
    },
  },

  mutations: {
    DEFAULT_VALUE(state) {
      state.additional = DICTIONARIES.additional;
    },
    ADD_PIZZA(state, pizza) {
      const pizzaInfo = state.pizzas.find(
        (it) => it.pizzaName === pizza.pizzaName
      );
      if (pizzaInfo) {
        pizzaInfo.doughId = pizza.doughId;
        pizzaInfo.sauceId = pizza.sauceId;
        pizzaInfo.pizzaSizeId = pizza.pizzaSizeId;
        pizzaInfo.pizzaName = pizza.pizzaName;
        pizzaInfo.sum = pizza.sum;
        pizzaInfo.selectedIngredients = pizza.selectedIngredients;
      } else {
        pizza.quantity = 1;
        state.pizzas.push(pizza);
      }
    },
    CHANGE_PIZZA_COUNT(state, data) {
      if (data.quantity === MIN_INGREDIENT_COUNT) {
        state.pizzas =
          state.pizzas.length > 1
            ? state.pizzas.filter((it) => it.pizzaName !== data.name)
            : [];
      } else {
        const pizza = state.pizzas.find((it) => it.pizzaName === data.name);
        pizza.quantity = data.quantity;
      }
    },
    CHANGE_SELECTED_ADDITIONAL(state, data) {
      const misc = state.selectedAdditional.find(
        (it) => it.miscId === data.miscId
      );
      if (misc) {
        misc.quantity = data.quantity;
      } else {
        state.selectedAdditional.push(data);
      }

      // Удаляем из списка ингредиент, если его количество равно нулю
      if (data.quantity === MIN_INGREDIENT_COUNT) {
        state.selectedAdditional = state.selectedAdditional.filter(
          (it) => it.miscId !== data.miscId
        );
      }
    },
    RESET_STATE(state) {
      state.pizzas = [];
      state.selectedAdditional = {};
      state.receivingOrder = "";
      state.phone = "";
      state.address = {};
      state.totalPric = 0;
    },
    ADD_PHONE(state, phone) {
      state.phone = phone;
    },
    ADD_ADDRESS(state, data) {
      state.address = data;
    },
    ADD_RECEIVING_ORDER(state, data) {
      state.receivingOrder = data;
    },
    ADD_PIZZAS(state, data) {
      state.pizzas = data;
    },
    ADD_SELECTED_ADDITIONAL(state, data) {
      state.selectedAdditional = data;
    },
    ADD_TOTAL_PRICE(state, data) {
      state.totalPrice = data;
    },
    CHANGE_ADDRESS_FIELD(state, data) {
      const addressField = Object.keys(data)[0];
      state.address[addressField] = data[addressField];
    },
  },
};
