import Sidebar from "../Component/Sidebar";
import AdminHeader from "../Component/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-6 overflow-auto">
          {children}
        </div>
      </div>

    </div>
  );
}