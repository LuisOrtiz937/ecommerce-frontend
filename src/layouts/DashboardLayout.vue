<template>
  <a-layout style="min-height: 100vh;">
    <!-- ✅ SIDEBAR -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      :trigger="null"
      theme="dark"
      width="230"
      collapsed-width="80"
      style="position: fixed; height: 100vh; left: 0; top: 0; bottom: 0;"
    >
      <div class="logo">
        <h2 v-if="!collapsed">🛍️ ADMIN</h2>
        <h2 v-else>🛍️</h2>
      </div>

      <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        @click="handleMenuClick"
        :items="menuItems"
      />
    </a-layout-sider>

    <!-- ✅ MAIN LAYOUT -->
    <a-layout
      :style="{
        marginLeft: collapsed ? '80px' : '230px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
      }"
    >
      <!-- 🔹 NAVBAR SUPERIOR -->
      <a-layout-header
        style="
          background: #001529;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          height: 64px;
        "
      >
        <div style="display: flex; align-items: center; gap: 10px;">
          <a-button type="text" @click="toggleCollapsed" style="color: white;">
            <menu-unfold-outlined v-if="collapsed" />
            <menu-fold-outlined v-else />
          </a-button>
          <span style="font-size: 18px; font-weight: 600;">Panel de Administración</span>
        </div>

        <div style="display: flex; align-items: center; gap: 15px;">
          <a-avatar style="background: #1890ff;">A</a-avatar>
          <a-dropdown placement="bottomRight">
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">Perfil</a-menu-item>
                <a-menu-item key="logout" @click="logout">Cerrar sesión</a-menu-item>
              </a-menu>
            </template>
            <a-button type="link" style="color: white;">Admin</a-button>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 🔹 CONTENIDO -->
      <a-layout-content
        style="
          flex: 1;
          padding: 24px;
          margin-top: 16px;
          background: #f5f5f5;
          overflow-y: auto;
          transition: all 0.3s ease;
        "
      >
        <router-view />
      </a-layout-content>

      <!-- 🔹 FOOTER FIJO -->
      <a-layout-footer
        style="
          text-align: center;
          background: #001529;
          color: #fff;
          padding: 12px 0;
          transition: all 0.3s ease;
        "
      >
        © {{ new Date().getFullYear() }} Ecommerce Dashboard | Desarrollado por Luis Ortiz
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { useRouter } from "vue-router";
import { message, Modal } from "ant-design-vue";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  SafetyOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons-vue";
import type { ItemType } from "ant-design-vue";
import { logout as authLogout } from "../services/authService"; // ✅ importa el servicio

const router = useRouter();
const collapsed = ref(false);
const selectedKeys = ref<string[]>(["dashboard"]);

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};

// ✅ Logout completo y elegante
const logout = () => {
  Modal.confirm({
    title: "¿Deseas cerrar sesión?",
    content: "Tu sesión actual se cerrará y deberás iniciar nuevamente.",
    okText: "Sí, cerrar",
    cancelText: "Cancelar",
    okType: "danger",
    async onOk() {
      try {
        // Limpia toda la información del usuario
        authLogout();

        message.success("Sesión cerrada correctamente ✅");
        router.push("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        message.error("Ocurrió un error al cerrar sesión ❌");
      }
    },
  });
};

const menuItems: ItemType[] = [
  { key: "dashboard", icon: () => h(DashboardOutlined), label: "Dashboard" },
  { key: "usuarios", icon: () => h(UserOutlined), label: "Usuarios" },
  { key: "roles", icon: () => h(TeamOutlined), label: "Roles" },
  { key: "permisos", icon: () => h(SafetyOutlined), label: "Permisos" },
  { key: "pedidos", icon: () => h(ShoppingCartOutlined), label: "Pedidos" },
  { key: "productos", icon: () => h(ShoppingOutlined), label: "Productos" },
  { key: "configuracion", icon: () => h(SettingOutlined), label: "Configuración" },
];

const handleMenuClick = (e: any) => {
  selectedKeys.value = [e.key];
  const routes: Record<string, string> = {
    dashboard: "/dashboard/admin",
    usuarios: "/dashboard/usuarios",
    roles: "/dashboard/roles",
    permisos: "/dashboard/permisos",
    pedidos: "/dashboard/pedidos",
    productos: "/dashboard/productos",
    configuracion: "/dashboard/config",
  };
  router.push(routes[e.key]);
};
</script>


<style scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #001529;
  color: white;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.ant-menu-dark {
  background: #001529 !important;
}

.ant-menu-dark .ant-menu-item-selected {
  background-color: #1890ff !important;
}

.ant-menu-dark .ant-menu-item {
  color: white !important;
}

.ant-menu-dark .ant-menu-item:hover {
  background: #003a8c !important;
}
</style>
