import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type AuthenticationState = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const initialState: AuthenticationState = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export const AuthenticationContext =
  createContext<AuthenticationState>(initialState);

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
