import { Fragment } from "react/jsx-runtime";
import AuthGuard from "./AuthGuard";
import { Routes as BrowserRoutes, Route } from "react-router-dom";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Home from "../pages/Home";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  hasAuth?: boolean;
}

const ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const AppRoute = () => {
  return (
    <>
      <BrowserRoutes>
        {ROUTES.map((route) => {
          const { hasAuth } = route;
          const Parent = hasAuth ? AuthGuard : Fragment;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Parent> {route.element} </Parent>}
            />
          );
        })}
      </BrowserRoutes>
    </>
  );
};

export default AppRoute;
