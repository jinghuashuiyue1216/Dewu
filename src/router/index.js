import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/products",
    name: "products",
    alias: "/",
    component: () => import("@/pages/products/index.vue"),
  },
  {
    path: "/product-detail",
    name: "product-detail",
    component: () => import("@/pages/product-detail/index.vue"),
  },
  {
    path: "/guide",
    name: "guide",
    component: () => import("@/pages/guide/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/pages/order/index.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/pages/order/index.vue"),
  },
  {
    path: "/result",
    name: "result",
    component: () => import("@/pages/order/result.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
