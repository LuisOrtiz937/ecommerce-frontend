<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons-vue";
import { login } from "../services/authService";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    await login(form.email, form.password);
    message.success("Bienvenido ✅");
    router.push("/dashboard");
  } catch (error: any) {
    message.error(error.response?.data?.error || "Credenciales inválidas");
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
      <a-card
        bordered
        style="
          width: 400px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        "
      >
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin-bottom: 8px;">🛍️ Ecommerce</h2>
          <p style="color: #888;">Inicia sesión para continuar</p>
        </div>

        <a-form layout="vertical" @submit.prevent="handleLogin">
          <a-form-item label="Email">
            <a-input
              v-model:value="form.email"
              type="email"
              placeholder="Ingresa tu correo"
              size="large"
              required
            >
              <template #prefix><UserOutlined /></template>
            </a-input>
          </a-form-item>

          <a-form-item label="Contraseña">
            <a-input-password
              v-model:value="form.password"
              placeholder="Ingresa tu contraseña"
              size="large"
              required
            >
              <template #prefix><LockOutlined /></template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              block
              size="large"
              :loading="loading"
              @click="handleLogin"
            >
              <template #icon><LoginOutlined /></template>
              Ingresar
            </a-button>
          </a-form-item>

          <div style="text-align: center; margin-top: 10px; color: #888;">
            ¿Olvidaste tu contraseña?
            <a style="margin-left: 5px;">Recuperar</a>
          </div>
        </a-form>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>