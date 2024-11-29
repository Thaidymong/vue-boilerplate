import Loginform from "@/views/Admin/Auth/Loginform.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import Layout from "@/views/Navbar/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "", // Empty path here means it will be the default view under "/"
        name: "dashboard",
        component: Dashboard,
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
