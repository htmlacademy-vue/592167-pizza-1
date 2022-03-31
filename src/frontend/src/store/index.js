import { uniqueId } from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import { MESSAGE_LIVE_TIME } from "@/constants";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
  users: [],
});

const actions = {
  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit("ADD_NOTIFICATION", uniqueNotification);
    setTimeout(
      () => commit("DELETE_NOTIFICATION", uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

const mutations = {
  ADD_NOTIFICATION(state, notification) {
    state.notifications = [...state.notifications, notification];
  },

  DELETE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [VuexPlugins],
  modules,
});
