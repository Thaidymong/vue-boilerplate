import Loginform from "@/views/Admin/Auth/Loginform.vue";
import Category from "@/views/Dashboard/Category.vue";
import CreateCategory from "@/views/Dashboard/CreateCategory.vue";
import CreateProductScreen from "@/views/Dashboard/CreateProductScreen.vue";
import ProductScreen from "@/views/Dashboard/ProductScreen.vue";
import Layout from "@/views/Navbar/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/category", // Empty path here means it will be the default view under "/"
        name: "category",
        component: Category,
      },
      {
        path: "/create-category",
        name: "create-category",
        component: CreateCategory,
      },
      {
        path: "/product",
        name: "product",
        component: ProductScreen,
      },
      {
        path: "/create-product",
        name: "create-product",
        component: CreateProductScreen,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Loginform,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
