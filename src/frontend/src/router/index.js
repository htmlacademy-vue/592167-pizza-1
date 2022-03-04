import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import routes from "@/router/routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;

  if (requireAuth && store.getters["Auth/isAuthenticated"]) {
    next();
  } else if (requireAuth && !store.getters["Auth/isAuthenticated"]) {
    next("/login");
  } else {
    next();
  }
});

export default router;
