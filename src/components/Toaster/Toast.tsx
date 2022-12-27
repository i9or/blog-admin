import { FC, useCallback } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { clsx } from "clsx";

import type { Toast as ToastProps } from "~/contexts/ToasterContext/ToasterContext";
import { useToaster } from "~/contexts/ToasterContext";

const iconByStatus = (status: ToastProps["status"]) => {
  switch (status) {
    case "info":
      return <FaInfoCircle size={14} />;
    case "success":
      return <FaCheckCircle size={14} />;
    case "warning":
      return <FaExclamationTriangle size={14} />;
    case "error":
      return <FaTimesCircle size={14} />;
    default:
      return null;
  }
};
export const Toast: FC<ToastProps> = ({ text, status, id }) => {
  const { dismissToast } = useToaster();

  const clickHandler = useCallback(() => {
    dismissToast(id);
  }, [dismissToast]);

  return (
    <div
      className={clsx(
        "m-2 flex animate-fade-in cursor-pointer select-none items-center gap-2 self-end rounded-xl bg-white py-1 pl-2 pr-3",
        status === "info" && "bg-blue-100 text-blue-600",
        status === "success" && "bg-green-100 text-green-600",
        status === "warning" && "bg-yellow-100 text-yellow-600",
        status === "error" && "bg-red-100 text-red-600"
      )}
      onClick={clickHandler}
      title="Click to dismiss"
    >
      {iconByStatus(status)}
      <span>{text}</span>
    </div>
  );
};
