import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { clsx } from "clsx";
import { FaSpinner } from "react-icons/all";

import { useToaster } from "~/contexts/ToasterContext";
import { useAuth } from "~/contexts/AuthenticationContext";
import { tryUpdate } from "~/api/authentication";

type UserForm = {
  userName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// TODO: extract input with label as a separate component
export const UserPage = () => {
  const { userName } = useAuth();
  const { addToast } = useToaster();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { isValid, isSubmitted, errors: formErrors },
    reset: resetForm,
  } = useForm<UserForm>({
    defaultValues: {
      userName,
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ userName, currentPassword, newPassword }: UserForm) => {
      return tryUpdate(userName, currentPassword, newPassword);
    },
    onSuccess: () => {
      addToast("Credentials updated, nice!", "success");
    },
    onError: () => {
      addToast("Credentials update failed successfully!", "error");
    },
    onSettled: () => {
      resetForm({
        userName: getValues("userName"),
        confirmPassword: "",
        newPassword: "",
        currentPassword: "",
      });
    },
  });

  const submitHandler: SubmitHandler<UserForm> = (data) => {
    mutate(data);
  };

  return (
    <section className="px-10 py-14 text-white">
      <h1 className="mb-8 text-3xl font-bold">User Settings</h1>
      <form
        className="flex flex-col items-start"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className="relative mb-4 flex flex-col">
          <span className="mb-2 text-sm">
            User name
            <span className="mx-0.5 text-rose-500">*</span>
          </span>
          <div className="relative">
            <input
              {...register("userName", { required: true })}
              className={clsx(
                "h-10 w-80 rounded border bg-gray-800 p-3",
                formErrors.userName ? "border-rose-500" : "border-gray-500"
              )}
              autoComplete="username"
            />
            {formErrors.userName ? (
              <div className="absolute top-0 left-80 ml-2 flex h-10 items-center justify-center whitespace-nowrap p-1 text-sm text-rose-400">
                {formErrors.userName.type === "required" ? "Empty!" : null}
              </div>
            ) : null}
          </div>
        </label>
        <label className="relative mb-4 flex flex-col">
          <span className="mb-2 text-sm">
            Current password
            <span className="mx-0.5 text-rose-500">*</span>
          </span>
          <div className="relative">
            <input
              {...register("currentPassword", { required: true })}
              className={clsx(
                "h-10 w-80 rounded border bg-gray-800 p-3",
                formErrors.currentPassword
                  ? "border-rose-500"
                  : "border-gray-500"
              )}
              type="password"
              autoComplete="current-password"
            />
            {formErrors.currentPassword ? (
              <div className="absolute top-0 left-80 ml-2 flex h-10 items-center justify-center whitespace-nowrap p-1 text-sm text-rose-400">
                {formErrors.currentPassword.type === "required"
                  ? "Empty!"
                  : null}
              </div>
            ) : null}
          </div>
        </label>
        <label className="relative mb-4 flex flex-col">
          <span className="mb-2 text-sm">
            New password
            <span className="mx-0.5 text-rose-500">*</span>
          </span>
          <div className="relative">
            <input
              {...register("newPassword", { required: true, minLength: 8 })}
              className={clsx(
                "h-10 w-80 rounded border bg-gray-800 p-3",
                formErrors.newPassword ? "border-rose-500" : "border-gray-500"
              )}
              type="password"
              autoComplete="new-password"
            />
            {formErrors.newPassword ? (
              <div className="absolute top-0 left-80 ml-2 flex h-10 items-center justify-center whitespace-nowrap p-1 text-sm text-rose-400">
                {formErrors.newPassword.type === "required" ? "Empty!" : null}
                {formErrors.newPassword.type === "minLength"
                  ? "Too short!"
                  : null}
              </div>
            ) : null}
          </div>
        </label>
        <label className="relative mb-4 flex flex-col">
          <span className="mb-2 text-sm">
            Confirm new password
            <span className="mx-0.5 text-rose-500">*</span>
          </span>
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: true,
                validate: {
                  match: (value) => value === getValues().newPassword,
                },
              })}
              className={clsx(
                "h-10 w-80 rounded border bg-gray-800 p-3",
                formErrors.confirmPassword
                  ? "border-rose-500"
                  : "border-gray-500"
              )}
              type="password"
              autoComplete="new-password"
            />
            {formErrors.confirmPassword ? (
              <div className="absolute top-0 left-80 ml-2 flex h-10 items-center justify-center whitespace-nowrap p-1 text-sm text-rose-400">
                {formErrors.confirmPassword.type === "match"
                  ? "Don't match!"
                  : null}
                {formErrors.confirmPassword.type === "required"
                  ? "Empty!"
                  : null}
              </div>
            ) : null}
          </div>
        </label>
        <button
          type="submit"
          className="mt-5 flex h-10 w-28 items-center justify-center rounded bg-gradient-to-b from-green-500 to-green-700 text-white hover:from-green-400 hover:to-green-600 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600 disabled:text-gray-400"
          disabled={isLoading || (isSubmitted && !isValid)}
        >
          {isLoading ? (
            <FaSpinner size={22} className="animate-spin" />
          ) : (
            "Update"
          )}
        </button>
      </form>
    </section>
  );
};
