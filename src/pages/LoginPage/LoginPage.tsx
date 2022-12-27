import { FaLock, FaSpinner, FaExclamationTriangle } from "react-icons/all";
import { SubmitHandler, useForm } from "react-hook-form";
import { clsx } from "clsx";
import { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import { castlePng } from "~/assets";
import { tryToLogin } from "~/api/authentication";
import { useAuth } from "~/contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/components/Routes";
import { toFromPath } from "~/utilities/routing";

type LoginForm = {
  login: string;
  password: string;
};

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    mutate,
    isLoading,
    isError,
    reset: resetMutation,
  } = useMutation({
    mutationFn: ({ login, password }: LoginForm) => {
      return tryToLogin(login, password);
    },
    onSuccess: ({ data }) => {
      login(data.userName);

      if (data.status === "success") {
        navigate(toFromPath(ROUTES.home.path), { replace: true });
      }

      if (data.status === "initial") {
        navigate(toFromPath(ROUTES.user.path), { replace: true });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid },
    reset,
    watch,
  } = useForm<LoginForm>();

  useEffect(() => {
    const subscription = watch(() => {
      resetMutation();
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const submitHandler: SubmitHandler<LoginForm> = (data) => {
    mutate(data);
    reset(undefined, {
      keepValues: true,
    });
  };

  return (
    <section className="grid h-full w-full place-content-center bg-gray-900">
      <div className="border-red flex flex-row overflow-hidden rounded-xl">
        <img className="w-96" src={castlePng} alt="Dark Japanese castle" />
        <form
          className="relative flex w-96 flex-col justify-center gap-6 bg-gray-800 px-12 text-gray-200"
          onSubmit={handleSubmit(submitHandler)}
        >
          {isError ? (
            <div className="absolute top-6 flex w-64 flex-row items-center justify-between self-center rounded-xl border border-rose-400 bg-rose-100 py-2 px-3 text-rose-400">
              <span>You shall not pass!</span>
              <FaExclamationTriangle />
            </div>
          ) : null}
          <div className="mb-8 flex justify-center">
            {isLoading ? (
              <FaSpinner size={60} className="animate-spin" />
            ) : (
              <FaLock size={60} />
            )}
          </div>
          <h1 className="mb-4 self-center text-3xl">Greetings, my liege!</h1>
          <input
            {...register("login", { required: true })}
            className={clsx(
              "h-10 rounded p-3 text-gray-800",
              formErrors.login &&
                "border border-rose-500 bg-rose-100 placeholder:text-rose-300"
            )}
            type="text"
            placeholder="Login"
            disabled={isLoading}
            autoComplete="username"
          />
          <input
            {...register("password", { required: true })}
            className={clsx(
              "h-10 rounded p-3 text-gray-800",
              formErrors.password &&
                "border border-rose-500 bg-rose-100 placeholder:text-rose-300"
            )}
            type="password"
            placeholder="Password"
            disabled={isLoading}
            autoComplete="current-password"
          />
          <button
            className="h-10 rounded bg-gradient-to-b from-green-500 to-green-700 text-white hover:from-green-400 hover:to-green-600 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600 disabled:text-gray-400"
            type="submit"
            disabled={!isValid || isLoading}
          >
            Break in!
          </button>
        </form>
      </div>
    </section>
  );
};
