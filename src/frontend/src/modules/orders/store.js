import {
  prepareAddressForOrder,
  prepareIngredients,
  prepareOrdersForView,
  preparePizzaForOrder,
} from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    orders: [],
    isLoaded: true,
  },

  getters: {
    orders({ orders }, _, rootGetters) {
      let prepare = [];

      if (rootGetters.Builder.ingredients.length > 0) {
        const ingredient = rootGetters.Builder.ingredients[0];
        let ingredients = !Object.keys(ingredient).includes("rusName")
          ? prepareIngredients(rootGetters.Builder.ingredients)
          : rootGetters.Builder.ingredients;

        prepare = prepareOrdersForView(
          orders,
          rootGetters.Builder.pizzaSizes,
          rootGetters.Builder.doughs,
          rootGetters.Builder.sauces,
          ingredients,
          rootGetters.Cart.additional
        );
      }

      return prepare;
    },
    isOrders({ orders }) {
      return orders.length > 0;
    },
    isLoaded({ isLoaded }) {
      return isLoaded;
    },
  },

  actions: {
    initState({ commit }, data) {
      commit("INIT_STATE", data);
    },

    async addOrder({ commit, rootState }) {
      const pizzas = preparePizzaForOrder(rootState.Cart.pizzas);
      const address = prepareAddressForOrder(
        rootState.Cart.address,
        rootState.Cart.receivingOrder
      );
      const data = {
        userId: rootState.Auth.user.id,
        phone: rootState.Cart.phone,
        address,
        pizzas,
        misc: rootState.Cart.selectedAdditional,
      };
      await this.$api.orders.post(data);
      const newState = await this.$api.orders.get();
      commit("ADD_ORDER", newState);
    },

    async deleteOrder({ commit }, id) {
      await this.$api.orders.delete(id);
      commit("DELETE_ORDER", id);
    },

    changeIsLoaded({ commit }, data) {
      commit("CHANGE_IS_LOADED", data);
    },
  },

  mutations: {
    INIT_STATE(state, data) {
      state.orders = data;
    },

    ADD_ORDER(state, data) {
      state.orders = data;
      // state.orders.push(data);
    },

    DELETE_ORDER(state, id) {
      state.orders = state.orders.filter((it) => it.id !== id);
    },

    CHANGE_IS_LOADED(state, isLoaded) {
      state.isLoaded = isLoaded;
    },
  },
};
