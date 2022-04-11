import { preparePizzaInfo } from "@/common/helpers";
import { MIN_INGREDIENT_COUNT } from "@/constants";

const DICTIONARIES = {
  additional: [],
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
    additional: [],
  },

  getters: {
    pizzas({ pizzas }, _, rootState) {
      let ingredients = rootState.Builder.ingredients;
      return preparePizzaInfo(pizzas, ingredients);
    },
    totalPrice({ pizzas, selectedAdditional }) {
      let totalPrice = 0;
      if (pizzas.length > 0) {
        for (const pizza of pizzas) {
          totalPrice += pizza.sum * pizza.count;
        }
      }
      if (Object.keys(selectedAdditional).length > 0) {
        const selectedAdditionalKeys = Object.keys(selectedAdditional);
        for (const it of selectedAdditionalKeys) {
          const additional = DICTIONARIES.additional.find(
            (el) => el.name === it
          );
          totalPrice += additional.price * selectedAdditional[it];
        }
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
      if (+data.deliveryChoice >= 3) {
        const addressesFromState = rootState.Profile.addresses;
        const addressFromState = addressesFromState.find(
          (it) => it.id === +data.deliveryChoice - 2
        );
        address.street = addressFromState.street;
        address.building = addressFromState.building;
        address.flat = addressFromState.flat;
        address.comment = addressFromState.comment;
      } else if (+data.deliveryChoice === 2) {
        address.street = data.street;
        address.building = data.building;
        address.flat = data.flat;
      }
      commit("ADD_PHONE", data.phone);
      commit("ADD_ADDRESS", address);
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
        pizzaInfo.dough = pizza.dough;
        pizzaInfo.sauce = pizza.sauce;
        pizzaInfo.pizzaSize = pizza.pizzaSize;
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
      state.selectedAdditional = { ...state.selectedAdditional, ...data };
      if (data[Object.keys(data)[0]] === MIN_INGREDIENT_COUNT) {
        delete state.selectedAdditional[Object.keys(data)[0]];
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
  },
};
