import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },

  // ✅ Lazy loading para mejor performance
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },

  // ✅ Manejo de rutas no encontradas
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

// ✅ Protección de rutas con token guardado
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("accessToken");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
