import axios from "axios";
import { http } from "~/utilities/http";
import { CLIENT_ENV } from "~/utilities/configuration";

type LoginResponse = {
  message: string;
  status: "initial" | "success" | "failure";
};

export const tryToLogin = (login: string, password: string) => {
  // NOTE: this call should not redirect if failed,
  // thus using a separate instance of axios
  return axios.post<LoginResponse>(
    `${CLIENT_ENV.API_HOST}/api/v1/ministry/break-in`,
    {
      login,
      password,
    },
    { withCredentials: true }
  );
};

export const logout = () => {
  // NOTE: this call should not redirect if failed,
  // thus using a separate instance of axios
  return axios.delete(`${CLIENT_ENV.API_HOST}/api/v1/ministry/decamp`, {
    withCredentials: true,
  });
};

export const refresh = () => {
  return http.get("/api/v1/ministry/reinvigorate");
};
