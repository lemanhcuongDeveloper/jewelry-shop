import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Login from "./Component/Login";
import Register from "./Component/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import Dashboard from "./pages/admin/AdminDashboard";
import Orders from "./Component/Orders";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminBlogs from "./pages/admin/AdminBlogs";
import Blogs from "./Component/Blogs";
import BlogDetail from "./Component/BlogDetail";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}