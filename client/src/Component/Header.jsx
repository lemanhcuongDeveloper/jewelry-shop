import { ShoppingCart, Search, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ toggleCart }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-xl font-semibold cursor-pointer"
      >
        Jewelry Shop
      </div>

      {/* Menu */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <span className="hover:text-pink-500 cursor-pointer">Trang chủ</span>
        <span className="hover:text-pink-500 cursor-pointer">Sản phẩm</span>
        <span className="hover:text-pink-500 cursor-pointer">Liên hệ</span>
        <Link className="hover:text-pink-500" to="/blogs">Blog</Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Search className="cursor-pointer" />

        <ShoppingCart
          onClick={toggleCart}
          className="cursor-pointer"
        />

        {/* 🔥 CHƯA LOGIN */}
        {!user && (
          <User
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:text-pink-500"
          />
        )}

        {/* 🔥 ĐÃ LOGIN */}
        {user && (
          <div className="flex items-center gap-3">
            
            {/* NAME */}
            <span className="text-sm">
              {user.name}
            </span>

            {/* ADMIN */}
            {user.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="text-xs bg-black text-white px-2 py-1 rounded"
              >
                Admin
              </button>
            )}

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}