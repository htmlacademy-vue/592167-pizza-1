export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      layout: "AppLayoutWithoutHeader",
    },
  },
];
