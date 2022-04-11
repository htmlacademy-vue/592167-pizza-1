import { prepareMiscForOrder, preparePizzaForOrder } from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    orders: [],
  },

  getters: {
    orders({ orders }) {
      return orders;
    },
  },

  actions: {
    initState({ commit }) {
      commit("INIT_STATE");
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
      const data = {
        userId: rootState.Auth.user.id,
        phone: rootState.Cart.phone,
        address: {
          street: rootState.Cart.address.street,
          building: rootState.Cart.address.building,
          flat: rootState.Cart.address.flat,
          comment: rootState.Cart.address.comment,
        },
        pizzas,
        misc,
      };
      const order = await this.$api.orders.post(data);
      data.id = order.id;
      commit("ADD_ORDER", data);
      return "";
    },
  },

  mutations: {
    INIT_STATE(state) {
      state.userId = 1;
    },

    ADD_ORDER(state, data) {
      state.orders.push(data);
    },
  },
};
