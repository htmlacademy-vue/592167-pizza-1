import users from "@/static/user.json";

export default {
  namespaced: true,
  state: {
    user: null,
  },

  getters: {
    isAuthenticated({ user }) {
      return !!user;
    },
  },

  actions: {
    login({ commit }) {
      commit("LOG_IN", users);
    },

    logout({ commit }) {
      commit("LOG_OUT");
    },
  },

  mutations: {
    LOG_IN(state, payload) {
      state.user = payload;
    },

    LOG_OUT(state) {
      state.user = null;
    },
  },
};
