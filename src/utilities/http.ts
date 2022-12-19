import axios from "axios";
import { CLIENT_ENV } from "~/utilities/configuration";

export const http = axios.create({
  withCredentials: true,
  baseURL: CLIENT_ENV.API_HOST,
});
