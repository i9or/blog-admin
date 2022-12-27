import axios from "axios";
import { http } from "~/utilities/http";
import { CLIENT_ENV } from "~/utilities/configuration";

type LoginResponse = {
  message: string;
  userName: string;
  status: "initial" | "success" | "failure";
};

type RefreshResponse = {
  userName: string;
};

type UpdateResponse = {
  updatedUserName: string;
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

export const tryLogout = () => {
  // NOTE: this call should not redirect if failed,
  // thus using a separate instance of axios
  return axios.delete(`${CLIENT_ENV.API_HOST}/api/v1/ministry/decamp`, {
    withCredentials: true,
  });
};

export const tryRefresh = () => {
  return http.get<RefreshResponse>("/api/v1/ministry/reinvigorate");
};

export const tryUpdate = (
  login: string,
  password: string,
  newPassword: string
) => {
  return http.put<UpdateResponse>("/api/v1/ministry/reform", {
    login,
    password,
    newPassword,
  });
};
