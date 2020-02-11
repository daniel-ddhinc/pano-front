import AuthLayout from "@/layouts/Auth";
import DefaultLayout from "@/layouts/Default";
// import store from "../store";
// import { guardAPI } from "@/api/auth";

const publicRoute = [
  {
    path: "/",
    component: AuthLayout,
    meta: { title: "public" },
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "login",
        meta: { title: "login" },
        component: () => import("@/views/auth/Login.vue")
      }
    ]
  },
  {
    path: "/",
    component: AuthLayout,
    meta: { title: "register" },
    redirect: "/register",
    children: [
      {
        path: "/register",
        name: "register",
        meta: { title: "register" },
        component: () => import("@/views/auth/Register")
      }
    ]
  },
  {
    path: "*",
    redirect: "/dashboard"
  }
];

const protectedRoute = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { title: "public" },
    redirect: "/",
    children: [
      {
        path: "/",
        name: "home",
        meta: { title: "home" },
        component: () => import("@/views/main/Home.vue")
      }
    ]
  }
];

const routes = protectedRoute.concat(publicRoute);
export default routes;
