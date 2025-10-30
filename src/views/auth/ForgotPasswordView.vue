<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { forgotPassword } from "../../services/authService";
import { MailOutlined } from "@ant-design/icons-vue";

const email = ref("");
const loading = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  try {
    loading.value = true;
    await forgotPassword(email.value);
    message.success("Se ha enviado un correo de recuperación ✉️");
    router.push("/login");
  } catch (error: any) {
    message.error(error.response?.data?.error || "Error al enviar el correo");
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
          🔑 Recuperar contraseña
        </h2>

        <a-form layout="vertical" @submit.prevent="handleSubmit">
          <a-form-item label="Correo electrónico">
            <a-input
              v-model:value="email"
              type="email"
              size="large"
              placeholder="Ingresa tu correo"
              required
            >
              <template #prefix><MailOutlined /></template>
            </a-input>
          </a-form-item>

          <a-button
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleSubmit"
          >
            Enviar correo
          </a-button>

          <div style="text-align: center; margin-top: 10px;">
            <router-link to="/login">Volver al inicio de sesión</router-link>
          </div>
        </a-form>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
