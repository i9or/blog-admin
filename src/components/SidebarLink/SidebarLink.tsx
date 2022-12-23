import { ReactNode } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

type SidebarLinkProps = {
  icon: ReactNode;
  cursive?: boolean;
  to: string;
  title?: string;
};
export const SidebarLink = ({ icon, cursive, to, title }: SidebarLinkProps) => (
  <Link
    className={clsx(
      `relative mx-auto mt-2 mb-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-gray-800 text-green-500 shadow-lg hover:bg-green-600 hover:text-white`,
      { italic: cursive }
    )}
    to={to}
    title={title}
  >
    {icon}
  </Link>
);
