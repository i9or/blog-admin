import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from "react";

import { noop } from "~/utilities/common";

type AuthenticationState = {
  isAuthenticated: boolean;
  userName: string | undefined;
  login: (username: string) => void;
  logout: () => void;
};

const initialState: AuthenticationState = {
  isAuthenticated: false,
  userName: undefined,
  login: noop,
  logout: noop,
};

export const AuthenticationContext =
  createContext<AuthenticationState>(initialState);

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [userName, setUserName] = useState(initialState.userName);

  const login = useCallback(
    (username: string) => {
      setIsAuthenticated(true);
      setUserName(username);
    },
    [setIsAuthenticated, setUserName]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserName(undefined);
  }, [setIsAuthenticated, setUserName]);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        userName,
        login,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
