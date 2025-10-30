<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { register } from "../../services/authService";

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const loading = ref(false);

const handleRegister = async () => {
  try {
    loading.value = true;
    await register(form.name, form.email, form.password);
    message.success("Cuenta creada correctamente ✅");
    router.push("/login");
  } catch (error: any) {
    message.error(error.response?.data?.error || "Error al registrarse");
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
        style="width: 420px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
      >
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin-bottom: 8px;">🛍️ Ecommerce</h2>
          <p style="color: #888;">Crea tu cuenta para comenzar</p>
        </div>

        <a-form layout="vertical" @submit.prevent="handleRegister">
          <a-form-item label="Nombre completo">
            <a-input
              v-model:value="form.name"
              placeholder="Tu nombre"
              size="large"
              required
            >
              <template #prefix><UserOutlined /></template>
            </a-input>
          </a-form-item>

          <a-form-item label="Correo electrónico">
            <a-input
              v-model:value="form.email"
              type="email"
              placeholder="ejemplo@correo.com"
              size="large"
              required
            >
              <template #prefix><MailOutlined /></template>
            </a-input>
          </a-form-item>

          <a-form-item label="Contraseña">
            <a-input-password
              v-model:value="form.password"
              placeholder="Crea una contraseña segura"
              size="large"
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
            @click="handleRegister"
          >
            <template #icon><PlusOutlined /></template>
            Crear cuenta
          </a-button>

          <div style="text-align: center; margin-top: 15px; color: #888;">
            ¿Ya tienes una cuenta?
            <a style="margin-left: 5px;" @click="$router.push('/login')">Iniciar sesión</a>
          </div>
        </a-form>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
