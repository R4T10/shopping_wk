import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NavBar from "../views/NavBar.vue";
import LoginView from "@/views/LoginView.vue";
import GStore from "@/store";
import ProductService from "@/service/ProductService";
const routes = [
  {
    path: "",
    name: "NavBar",
    component: NavBar,
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
        beforeEnter: () => {
          if (GStore.currentUser != null) {
            return ProductService.getProductList(GStore.currentUser);
          }
        },
      },
      {
        path: "/about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "LoginPage",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
