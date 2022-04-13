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
    receivingOrder: "",
    phone: "",
    address: {},
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
          totalPrice += it.sum * it.count;
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
    addAddressFormFields({ commit, rootState }, data) {
      const address = {
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      if (+data.deliveryChoice >= MY_FIRST_ADDRESS) {
        const addressesFromState = rootState.Profile.addresses;
        const addressFromState = addressesFromState.find(
          (it) => it.id === +data.deliveryChoice - NEW_ADDRESS
        );
        address.street = addressFromState.street;
        address.building = addressFromState.building;
        address.flat = addressFromState.flat;
        address.comment = addressFromState.comment;
      } else if (+data.deliveryChoice === NEW_ADDRESS) {
        address.street = data.street;
        address.building = data.building;
        address.flat = data.flat;
      }
      commit("ADD_PHONE", data.phone);
      commit("ADD_ADDRESS", address);
      commit("ADD_RECEIVING_ORDER", data.deliveryChoice);
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
        pizza.count = 1;
        state.pizzas.push(pizza);
      }
    },
    CHANGE_PIZZA_COUNT(state, data) {
      if (data.count === MIN_INGREDIENT_COUNT) {
        state.pizzas =
          state.pizzas.length > 1
            ? state.pizzas.filter((it) => it.pizzaName !== data.name)
            : [];
      } else {
        const pizza = state.pizzas.find((it) => it.pizzaName === data.name);
        pizza.count = data.count;
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
  },
};
