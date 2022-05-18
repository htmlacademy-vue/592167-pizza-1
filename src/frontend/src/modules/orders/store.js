import {
  prepareAddressForOrder,
  prepareOrdersForView,
  preparePizzaForOrder,
} from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    orders: [],
  },

  getters: {
    orders({ orders }, _, rootState) {
      return prepareOrdersForView(
        orders,
        rootState.Builder.pizzaSizes,
        rootState.Builder.doughs,
        rootState.Builder.sauces,
        rootState.Builder.ingredients,
        rootState.Cart.additional
      );
    },
    isOrders({ orders }) {
      return orders.length > 0;
    },
    isLoaded({ orders }) {
      return !orders.length > 0;
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
  },
};
