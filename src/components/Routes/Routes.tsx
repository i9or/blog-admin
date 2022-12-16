import {ReactNode} from "react";
import {Home} from "~/pages/HomePage/HomePage";
import {LoginPage} from "~/pages/LoginPage/LoginPage";

type RouteDetails = {
  path: string;
  element: ReactNode;
};
type RoutesMap<T extends string> = {
  readonly [k in T]: Readonly<RouteDetails>;
};

function defineRoutes<T extends string>(m: RoutesMap<T>) {
  return m;
}

export const ROUTES = defineRoutes({
  home: {
    path: "",
    element: <Home/>,
  },
  newPost: {
    path: "new-post",
    element: <h1>New Post</h1>,
  },
  editNow: {
    path: "edit-now",
    element: <h1>Edit Now</h1>,
  },
  analytics: {
    path: "analytics",
    element: <h1>Analytics</h1>,
  },
  user: {
    path: "user",
    element: <h1>User</h1>,
  },
  login: {
    path: "login",
    element: <LoginPage/>,
  },
  logout: {
    path: "logout",
    element: <h1>Logout</h1>,
  },
});
