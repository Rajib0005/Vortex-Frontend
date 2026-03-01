import { Navigate, type RouteObject } from "react-router-dom";
import { authRoutes } from "../feature/auth/routes";
import BaseLayout from "./route.layout"
import { ProtectedRoute } from "./ProtectedRoute";

const routes: RouteObject[] = [
  ...authRoutes,
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <BaseLayout />,
        children: [
          {
            index: true,
            element: <div>Dashboard (Protected Area)</div>,
          },
          // Future protected routes go here
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
];

export default routes;
