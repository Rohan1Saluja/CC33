import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Add sidebar/header if needed */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
