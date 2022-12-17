import { Link } from "react-router-dom";
import { toFromPath } from "~/utilities/routing";
import { ROUTES } from "~/components/Routes";

export const NoMatch = () => (
  <>
    <h1>Oops!</h1>
    <p>This page seems not to be found.</p>
    <Link to={toFromPath(ROUTES.home.path)}>Go to the home page</Link>
  </>
);
