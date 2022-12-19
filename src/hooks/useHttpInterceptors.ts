import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "~/contexts/AuthenticationContext";
import { toFromPath } from "~/utilities/routing";
import { ROUTES } from "~/components/Routes";
import { http } from "~/utilities/http";

export const useHttpInterceptors = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ONCE");
    http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          setIsAuthenticated(false);
          navigate(toFromPath(ROUTES.login.path));
        }

        return Promise.reject(error);
      }
    );
  }, []);
};
