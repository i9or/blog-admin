import { http } from "~/utilities/http";
import { CLIENT_ENV } from "~/utilities/configuration";

type LoginResponse = {
  message: string;
  status: "initial" | "success" | "failure";
};

export const tryToLogin = (login: string, password: string) => {
  return http.post<LoginResponse>("/api/v1/ministry/break-in", {
    login,
    password,
  });
};

export const logout = () => {
  return http.delete("/api/v1/ministry/decamp");
};

export const refresh = () => {
  return http.get("/api/v1/ministry/reinvigorate");
};
