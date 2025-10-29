import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("../views/AdminDashboard.vue"),
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/empleado/home",
    name: "EmpleadoHome",
    component: () => import("../views/EmpleadoHome.vue"),
    meta: { requiresAuth: true, role: "empleado" },
  },
  {
    path: "/cliente/home",
    name: "ClienteHome",
    component: () => import("../views/ClienteHome.vue"),
    meta: { requiresAuth: true, role: "cliente" },
  },
  {
    path: "/domicilios",
    name: "Domicilios",
    component: () => import("../views/DomiciliosView.vue"),
    meta: { requiresAuth: true, role: "domiciliario" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Protección de rutas
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.meta.role && user?.role_name !== to.meta.role) {
    next("/login");
  } else {
    next();
  }
});

export default router;
