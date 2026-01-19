import { Navigate, type RouteObject } from "react-router-dom";
import { authRoutes } from "../feature/auth/routes";
import BaseLayout from "./route.layout"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [{

      index: true,
      element: <Navigate to='/login'  replace/>,
    },
    ...authRoutes
  ],
  },
];

export default routes;
