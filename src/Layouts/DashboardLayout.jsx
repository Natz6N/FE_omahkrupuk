import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
export default function DashboardLayouts() {
  return (
    <div className="flex items-center justify-center w-full">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
