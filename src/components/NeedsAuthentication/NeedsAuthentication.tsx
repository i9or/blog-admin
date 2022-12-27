import { useMutation } from "@tanstack/react-query";
import { FC, PropsWithChildren, useEffect } from "react";
import { FaLock } from "react-icons/fa";

import { tryRefresh } from "~/api/authentication";
import { useAuth } from "~/contexts/AuthenticationContext";

export const NeedsAuthentication: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return tryRefresh();
    },
    onSuccess: ({ data }) => {
      login(data.userName);
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      mutate();
    }
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <section className="grid h-full w-full flex-row place-content-center bg-gray-800 text-gray-200">
        <FaLock size={80} className="animate-pulse" />
      </section>
    );
  }

  return <>{children}</>;
};
