import type { RouteObject } from "react-router-dom";
import Login from "../components/Login";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
];
