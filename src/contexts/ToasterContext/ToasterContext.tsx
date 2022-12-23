import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useReducer,
} from "react";
import { nanoid } from "nanoid";

import { noop } from "~/utilities/common";

const TOASTS_LIMIT = 15;

export type Toast = {
  id: string;
  text: string;
  status: "success" | "error" | "info" | "warning";
};

const DEFAULT_TIMEOUTS: {
  [key in Toast["status"]]: number;
} = {
  error: 4000,
  info: 4000,
  success: 2000,
  warning: 3000,
};

enum ToasterActionType {
  ADD = "ADD",
  DISMISS = "DISMISS",
}

type ToasterInternalState = {
  toasts: Toast[];
};

type ToasterContextState = ToasterInternalState & {
  addToast: (text: Toast["text"], status: Toast["status"]) => void;
  dismissToast: (id: Toast["id"]) => void;
};

type ToasterAction =
  | { type: ToasterActionType.ADD; toast: Toast }
  | { type: ToasterActionType.DISMISS; id: string };

function toasterReducer(state: ToasterInternalState, action: ToasterAction) {
  switch (action.type) {
    case ToasterActionType.ADD:
      return {
        toasts: [...state.toasts.slice(-TOASTS_LIMIT), { ...action.toast }],
      };
    case ToasterActionType.DISMISS:
      return { toasts: state.toasts.filter((item) => item.id !== action.id) };
    default:
      throw new Error("Toaster action is not defined");
  }
}

const initialState: ToasterInternalState = {
  toasts: [],
};

export const ToasterContext = createContext<ToasterContextState>({
  toasts: [...initialState.toasts],
  addToast: noop,
  dismissToast: noop,
});

export const ToasterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toaster, toasterDispatch] = useReducer(toasterReducer, initialState);

  const dismissToast = useCallback(
    (id: Toast["id"]) => {
      toasterDispatch({ type: ToasterActionType.DISMISS, id });
    },
    [toasterDispatch]
  );

  const addToast = useCallback(
    (text: Toast["text"], status: Toast["status"]) => {
      const id = nanoid();
      toasterDispatch({
        type: ToasterActionType.ADD,
        toast: {
          id,
          text,
          status,
        },
      });
      setTimeout(() => {
        toasterDispatch({ type: ToasterActionType.DISMISS, id });
      }, DEFAULT_TIMEOUTS[status]);
    },
    [toasterDispatch]
  );

  return (
    <ToasterContext.Provider
      value={{
        toasts: toaster.toasts,
        addToast,
        dismissToast,
      }}
    >
      {children}
    </ToasterContext.Provider>
  );
};
