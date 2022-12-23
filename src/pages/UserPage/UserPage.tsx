import { clsx } from "clsx";
import { useToaster } from "~/contexts/ToasterContext";
import { Toast } from "~/contexts/ToasterContext/ToasterContext";

const statuses: Array<Toast["status"]> = [
  "success",
  "warning",
  "error",
  "info",
];
const getRandomStatus = () =>
  statuses[Math.floor(Math.random() * statuses.length)];

export const UserPage = () => {
  const { addToast } = useToaster();

  return (
    <section className="px-10 py-14 text-white">
      <h1 className="mb-8 text-3xl font-bold">User Settings</h1>
      <form
        className="flex flex-col items-start"
        onSubmit={(e) => {
          e.preventDefault();
          addToast("Submitted!", getRandomStatus());
        }}
      >
        <label className="mb-2 text-sm" htmlFor="username">
          Username
          <span className="mx-0.5 text-rose-500">*</span>
        </label>
        <input
          className="mb-4 h-10 w-80 rounded border border-gray-500 bg-gray-800 p-3"
          type="text"
          id="username"
          autoComplete="username"
        />
        <label className="mb-2 text-sm" htmlFor="currentPassword">
          Current password
          <span className="mx-0.5 text-rose-500">*</span>
        </label>
        <input
          className="mb-4 h-10 w-80 rounded border border-gray-500 bg-gray-800 p-3"
          type="password"
          id="currentPassword"
          autoComplete="current-password"
        />
        <label className="mb-2 text-sm" htmlFor="newPassword">
          New password
          <span className="mx-0.5 text-rose-500">*</span>
        </label>
        <input
          className="mb-4 h-10 w-80 rounded border border-gray-500 bg-gray-800 p-3"
          type="password"
          id="newPassword"
          autoComplete="new-password"
        />
        <label className="mb-2 text-sm" htmlFor="confirmNewPassword">
          Confirm new password
          <span className="mx-0.5 text-rose-500">*</span>
        </label>
        <input
          className="mb-8 h-10 w-80 rounded border border-gray-500 bg-gray-800 p-3"
          type="password"
          id="confirmNewPassword"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="h-10 w-28 rounded bg-gradient-to-b from-green-500 to-green-700 text-white hover:from-green-400 hover:to-green-600 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600 disabled:text-gray-400"
        >
          Update
        </button>
      </form>
    </section>
  );
};
