<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { LockOutlined } from "@ant-design/icons-vue";
import { resetPassword } from "../../services/authService";

const route = useRoute();
const router = useRouter();
const token = ref<string>("");
const newPassword = ref("");
const loading = ref(false);

onMounted(() => {
  token.value = (route.query.token as string) || "";
  if (!token.value) {
    message.error("Token inválido o ausente");
    router.push("/login");
  }
});

const handleReset = async () => {
  try {
    loading.value = true;
    await resetPassword(token.value, newPassword.value);
    message.success("Contraseña restablecida correctamente ✅");
    router.push("/login");
  } catch (error: any) {
    message.error(error.response?.data?.error || "Error al restablecer la contraseña");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <a-layout style="min-height: 100vh; background: #f0f2f5;">
    <a-layout-content
      style="display: flex; justify-content: center; align-items: center;"
    >
      <a-card style="width: 400px; border-radius: 10px;">
        <h2 style="text-align: center; margin-bottom: 20px;">
          🔐 Restablecer contraseña
        </h2>

        <a-form layout="vertical" @submit.prevent="handleReset">
          <a-form-item label="Nueva contraseña">
            <a-input-password
              v-model:value="newPassword"
              size="large"
              placeholder="Ingresa una nueva contraseña"
              required
            >
              <template #prefix><LockOutlined /></template>
            </a-input-password>
          </a-form-item>

          <a-button
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleReset"
          >
            Cambiar contraseña
          </a-button>

          <div style="text-align: center; margin-top: 10px;">
            <router-link to="/login">Volver al inicio de sesión</router-link>
          </div>
        </a-form>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
