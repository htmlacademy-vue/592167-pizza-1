export default {
  namespaced: true,

  state: {
    addresses: [],
    isLoaded: true,
  },

  getters: {
    addresses({ addresses }) {
      return addresses;
    },

    isLoaded({ isLoaded }) {
      return isLoaded;
    },
  },

  actions: {
    addAddress({ commit }, data) {
      commit("ADD_ADDRESS", data);
    },

    initAddresses({ commit }, data) {
      commit("ADD_ADDRESSES", data);
    },

    changeAddress({ commit }, data) {
      commit("CHANGE_ADDRESS", data);
    },

    deleteAddress({ commit }, id) {
      commit("DELETE_ADDRESS", id);
    },

    changeIsLoaded({ commit }, data) {
      commit("CHANGE_IS_LOADED", data);
    },
  },

  mutations: {
    ADD_ADDRESSES(state, data) {
      if (state.addresses.length === 0) {
        state.addresses = data;
      }
    },

    async ADD_ADDRESS(state, data) {
      const address = await this.$api.addresses.post(data);
      state.addresses = [...state.addresses, address];
    },

    async CHANGE_ADDRESS(state, data) {
      await this.$api.addresses.put(data);

      const address = state.addresses.find((it) => it.id === data.id);
      address.name = data.name;
      address.street = data.street;
      address.building = data.building;
      address.flat = data.flat;
      address.comment = data.comment;
    },

    async DELETE_ADDRESS(state, id) {
      await this.$api.addresses.delete(id);

      state.addresses = state.addresses.filter((it) => it.id !== id);
    },

    CHANGE_IS_LOADED(state, isLoaded) {
      state.isLoaded = isLoaded;
    },
  },
};
