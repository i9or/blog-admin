import { Route, Routes } from "react-router-dom";

import { ROUTES } from "~/components/Routes";
import { NoMatch } from "~/components/NoMatch";
import { Layout } from "~/components/Layout";
import { useHttpInterceptors } from "~/hooks/useHttpInterceptors";
import { NeedsAuthentication } from "~/components/NeedsAuthentication";

export const App = () => {
  useHttpInterceptors();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NeedsAuthentication>
            <Layout />
          </NeedsAuthentication>
        }
      >
        <Route index element={ROUTES.home.element} />
        <Route path={ROUTES.newPost.path} element={ROUTES.newPost.element} />
        <Route path={ROUTES.editNow.path} element={ROUTES.editNow.element} />
        <Route
          path={ROUTES.analytics.path}
          element={ROUTES.analytics.element}
        />
        <Route path={ROUTES.user.path} element={ROUTES.user.element} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path={ROUTES.login.path} element={ROUTES.login.element} />
    </Routes>
  );
};
