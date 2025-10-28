import api from "./http";

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
};

export const logout = () => {
  localStorage.clear();
};
