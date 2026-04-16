import { LayoutDashboard, Users, Package, ShoppingCart, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-pink-50 to-white border-r p-5 shadow-sm">

      <h2 className="text-2xl font-bold text-pink-600 mb-8">
        Jewelry Admin
      </h2>

      <nav className="flex flex-col gap-4 text-gray-700">

        <Link
          to="/admin"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-100 hover:text-pink-600 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-100 hover:text-pink-600 transition"
        >
          <Package size={20} />
          Products
        </Link>

        <Link
          to="/admin/users"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-100 hover:text-pink-600 transition"
        >
          <Users size={20} />
          Users
        </Link>

        <Link
          to="/admin/orders"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-100 hover:text-pink-600 transition"
        >
          <ShoppingCart size={20} />
          Orders
        </Link>
        <Link
          to="/admin/blogs"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-100 hover:text-pink-600 transition"
        >
          <FileText size={20} />
          Blog
        </Link>
      </nav>
    </div>
  );
}