import axios from "axios";
import { UserTokenService } from "./UserTokenService";
import { AuthService } from "@/application/services/outros/AuthService";
import { eventBus } from "@/shared/utils/EventBus";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição
api.interceptors.request.use(
  async (config) => {
    const user = await UserTokenService.getInstance().get();

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      console.warn("Token expirado ou inválido");
      eventBus.emit("logout");
    }
    return Promise.reject(error);
  }
);

export { api };
