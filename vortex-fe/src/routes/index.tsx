import { Navigate, type RouteObject } from "react-router-dom";
import { authRoutes } from "../feature/auth/routes";
import BaseLayout from "./route.layout"
import { ProtectedRoute } from "./ProtectedRoute";
import { ComingSoon } from "@/components/shared/ComingSoon";
import {
  LayoutDashboard,
  Inbox,
  ListTodo,
  Disc,
  Target,
  LayoutTemplate,
  Layers,
  Users,
  Settings,
  Plus
} from "lucide-react";

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
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <ComingSoon title="dashboard" icon={LayoutDashboard} />,
          },
          {
            path: "inbox",
            element: <ComingSoon title="inbox" icon={Inbox} />,
          },
          {
            path: "my-issues",
            element: <ComingSoon title="my issues" icon={ListTodo} />,
          },
          {
            path: "views",
            element: <ComingSoon title="views" icon={Disc} />,
          },
          {
            path: "roadmap",
            element: <ComingSoon title="roadmap" icon={Target} />,
          },
          {
            index: true,
            path: "projects",
            element: <ComingSoon title="projects" icon={LayoutTemplate} />,
          },
          {
            path: "projects/new",
            element: <ComingSoon title="new project" icon={Plus} />,
          },
          {
            path: "hierarchy",
            element: <ComingSoon title="hierarchy" icon={Layers} />,
          },
          {
            path: "team",
            element: <ComingSoon title="team" icon={Users} />,
          },
          {
            path: "settings",
            element: <ComingSoon title="settings" icon={Settings} />,
          },
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
