import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 🔹 Lazy imports de layouts
const DashboardLayout = () => import("@/layouts/DashboardLayout.vue");
const StoreLayout = () => import("@/layouts/StoreLayout.vue");

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },

  // --- Autenticación ---
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/RegisterView.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPasswordView.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/auth/ResetPasswordView.vue"),
  },

  // --- Dashboard interno ---
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "admin",
        name: "AdminDashboard",
        component: () => import("@/views/admin/DashboardView.vue"),
        meta: { role: "admin" },
      },
      {
        path: "empleado",
        name: "EmpleadoHome",
        component: () => import("@/views/empleado/EmpleadoHome.vue"),
        meta: { role: "empleado" },
      },
      {
        path: "domicilios",
        name: "Domicilios",
        component: () => import("@/views/domiciliario/DomiciliosView.vue"),
        meta: { role: "domiciliario" },
      },
    ],
  },

  // --- Tienda (solo cliente) ---
  {
    path: "/store",
    component: StoreLayout,
    meta: { requiresAuth: true, role: "cliente" },
    children: [
      {
        path: "home",
        name: "ClienteHome",
        component: () => import("@/views/cliente/HomeView.vue"),
      },
      {
        path: "nosotros",
        name: "Nosotros",
        component: () => import("@/views/cliente/NosotrosView.vue"),
      },
      {
        path: "contacto",
        name: "Contacto",
        component: () => import("@/views/cliente/ContactoView.vue"),
      },
      {
        path: "pedidos",
        name: "Pedidos",
        component: () => import("@/views/cliente/PedidosView.vue"),
      },
      {
        path: "perfil",
        name: "Perfil",
        component: () => import("@/views/cliente/ProfileView.vue"),
      },
    ],
  },

  // --- 404 ---
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/auth/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// --- Protección de rutas ---
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
