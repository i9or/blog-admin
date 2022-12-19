import { Outlet } from "react-router-dom";
import { FaChartBar, FaFile, FaHome, FaRegUser } from "react-icons/fa";

import { SidebarLink } from "~/components/SidebarLink";
import { toFromPath } from "~/utilities/routing";
import { ROUTES } from "~/components/Routes";
import { LogoutButton } from "~/components/LogoutButton";

export const Layout = () => (
  <section className="flex h-full w-full flex-row bg-gray-700">
    <nav className="top-0 left-0 m-0 bg-gray-900">
      <ul className={"flex h-screen w-16 flex-col"}>
        <li>
          <SidebarLink
            to={toFromPath(ROUTES.home.path)}
            icon={<FaHome size="28" />}
          />
        </li>
        <li>
          <SidebarLink
            to={toFromPath(ROUTES.newPost.path)}
            icon={<FaFile size="24" />}
          />
        </li>
        <li>
          <SidebarLink
            to={toFromPath(ROUTES.editNow.path)}
            icon={"Now!"}
            cursive
          />
        </li>
        <li>
          <SidebarLink
            to={toFromPath(ROUTES.analytics.path)}
            icon={<FaChartBar size="24" />}
          />
        </li>
        <li className="mt-auto">
          <SidebarLink
            to={toFromPath(ROUTES.user.path)}
            icon={<FaRegUser size="24" />}
          />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
    <div className="h-full w-full overflow-y-auto">
      <main className="container mx-auto border border-teal-200 text-white">
        <Outlet />
      </main>
    </div>
  </section>
);
