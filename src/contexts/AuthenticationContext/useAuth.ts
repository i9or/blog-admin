import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export const useAuth = () => {
  return useContext(AuthenticationContext);
};
