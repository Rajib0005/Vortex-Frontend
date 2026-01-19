import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
        <main className="flex-1 p-6">
          <Outlet />
        </main>
  );
};

export default BaseLayout;
