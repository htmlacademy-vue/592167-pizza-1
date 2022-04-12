import {
  prepareAddressForOrder,
  prepareMiscForOrder,
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
  },

  actions: {
    initState({ commit }, data) {
      commit("INIT_STATE", data);
    },

    async addOrder({ commit, rootState }) {
      const pizzas = preparePizzaForOrder(
        rootState.Cart.pizzas,
        rootState.Builder.ingredients,
        rootState.Builder.doughs,
        rootState.Builder.sauces,
        rootState.Builder.pizzaSizes
      );
      const misc = prepareMiscForOrder(
        rootState.Cart.additional,
        rootState.Cart.selectedAdditional
      );
      const address = prepareAddressForOrder(
        rootState.Cart.address,
        rootState.Cart.receivingOrder
      );
      const data = {
        userId: rootState.Auth.user.id,
        phone: rootState.Cart.phone,
        address,
        pizzas,
        misc,
      };
      console.log(data);
      const order = await this.$api.orders.post(data);
      data.id = order.id;
      commit("ADD_ORDER", data);
      return "";
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
      state.orders.push(data);
    },

    DELETE_ORDER(state, id) {
      state.orders = state.orders.filter((it) => it.id !== id);
    },
  },
};
