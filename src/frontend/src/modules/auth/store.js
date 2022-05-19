export default {
  namespaced: true,
  state: {
    user: null,
  },

  getters: {
    isAuthenticated({ user }) {
      return !!user;
    },
    userInfo({ user }) {
      return user;
    },
  },

  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit("LOG_OUT");
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit("LOG_IN", data);
        const profile = await this.$api.addresses.get();
        if (profile.length > 0) {
          dispatch("Profile/initAddresses", [...profile], { root: true });
        }
        dispatch("Profile/changeIsLoaded", false, { root: true });
        const orders = await this.$api.orders.get();
        if (orders.length > 0) {
          dispatch("Orders/initState", [...orders], { root: true });
        }
        dispatch("Orders/changeIsLoaded", false, { root: true });
      } catch {
        dispatch("logout", false);
      }
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
