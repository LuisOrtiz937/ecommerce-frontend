<template>
  <a-layout class="min-h-screen">
    <!-- Navbar -->
    <a-layout-header class="bg-blue-600 flex items-center justify-between px-6">
      <h1 class="text-white text-xl font-bold cursor-pointer" @click="goHome">
        🛍️ MyStore
      </h1>
      <a-menu
        mode="horizontal"
        theme="dark"
        :selectedKeys="[selected]"
        @click="onMenuClick"
      >
        <a-menu-item key="home">Inicio</a-menu-item>
        <a-menu-item key="nosotros">Nosotros</a-menu-item>
        <a-menu-item key="contacto">Contáctenos</a-menu-item>
        <a-menu-item key="pedidos">Pedidos</a-menu-item>
        <a-menu-item key="perfil">Perfil</a-menu-item>
      </a-menu>
    </a-layout-header>

    <!-- Contenido -->
    <a-layout-content class="p-6 bg-gray-50">
      <router-view />
    </a-layout-content>

    <!-- Footer -->
    <a-layout-footer class="text-center bg-white border-t py-4">
      © 2025 MyStore - Todos los derechos reservados
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selected = ref("home");

const onMenuClick = (e: any) => {
  selected.value = e.key;
  router.push(`/store/${e.key}`);
};

const goHome = () => {
  router.push("/store/home");
};
</script>

<style scoped>
a-menu {
  background-color: transparent !important;
}
</style>
