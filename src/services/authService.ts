import api from "./http";

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });

  // ✅ Normalizamos el role_name a minúsculas
  const user = {
    ...data.user,
    role_name: data.user.role_name.toLowerCase(),
  };

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const logout = () => {
  localStorage.clear();
};
