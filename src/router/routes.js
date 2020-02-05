import AuthLayout from "@/layouts/Auth";
import DefaultLayout from "@/layouts/Default";
// import store from "../store";
// import { guardAPI } from "@/api/auth";

const publicRoute = [
  {
    path: "*",
    redirect: "/dashboard"
  }
];

const protectedRoute = [];

const routes = protectedRoute.concat(publicRoute);
export default routes;
