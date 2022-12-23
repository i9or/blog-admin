import { useCallback } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout } from "~/api/authentication";
import { useAuth } from "~/contexts/AuthenticationContext";
import { ROUTES } from "~/components/Routes";
import { toFromPath } from "~/utilities/routing";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const { mutate } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onSettled: () => {
      setIsAuthenticated(false);
      navigate(toFromPath(ROUTES.login.path), { replace: true });
    },
  });

  const clickHandler = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <button
      className="relative mx-auto mt-2 mb-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-gray-800 text-green-500 shadow-lg hover:bg-green-600 hover:text-white"
      onClick={clickHandler}
      title="Decamp!"
    >
      <FaSignOutAlt size="24" />
    </button>
  );
};
