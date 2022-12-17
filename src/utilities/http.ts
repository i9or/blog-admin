import axios from "axios";
import { CLIENT_ENV } from "~/utilities/configuration";
import { redirect } from "react-router-dom";
import { toFromPath } from "~/utilities/routing";
import { ROUTES } from "~/components/Routes";

export const http = axios.create({
  withCredentials: true,
  baseURL: CLIENT_ENV.API_HOST,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.assign(toFromPath(ROUTES.login.path));
    }

    return Promise.reject(error);
  }
);
