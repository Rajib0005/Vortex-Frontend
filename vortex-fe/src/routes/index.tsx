import { Navigate, type RouteObject } from "react-router-dom";
import { authRoutes } from "../feature/auth/routes";
import BaseLayout from "./route.layout"
import { ProtectedRoute } from "./ProtectedRoute";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { LandingPage } from "@/pages/LandingPage";
import {
  LayoutDashboard,
  Inbox,
  ListTodo,
  Disc,
  Target,
  Users,
  Settings,
  Plus,
  Network
} from "lucide-react";
import { ProjectsPage } from "../feature/projects/components/ProjectsPage";
import { TasksPage } from "../feature/tasks/components/TasksPage";

const routes: RouteObject[] = [
  ...authRoutes,
  {
    index: true,
    path: "/",
    element: <LandingPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <BaseLayout />,
        children: [
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
            path: "projects",
            element: <ProjectsPage />,
          },
          {
            path: "tasks",
            element: <TasksPage />,
          },
          {
            path: "projects/new",
            element: <ComingSoon title="new project" icon={Plus} />,
          },
          {
            path: "hierarchy",
            element: <ComingSoon title="hierarchy" icon={Network} />,
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
