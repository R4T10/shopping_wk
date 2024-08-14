import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NavBar from "../views/NavBar.vue";
import LoginView from "@/views/LoginView.vue";
import GStore from "@/store";
import ProductService from "@/service/ProductService";
import ProductDetail from "@/views/ProductDetail.vue";
import CartView from "@/views/CartView.vue";
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
      {
        path: "/product/:id",
        name: "ProductDetailView",
        component: ProductDetail,
        beforeEnter: (to) => {
          console.log(to.params.id);
          return ProductService.getProduct(to.params.id);
        },
        props: true,
      },
      {
        path: "/cart",
        name: "CartView",
        component: CartView,
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
