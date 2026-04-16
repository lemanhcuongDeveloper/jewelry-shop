import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
    fetchCharts();
  }, []);

  // ================= DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CHART =================
  const fetchCharts = async () => {
    try {
      const [salesRes, revenueRes] = await Promise.all([
        fetch("http://localhost:5000/admin/chart/sales", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/admin/chart/revenue", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const salesData = await salesRes.json();
      const revenueData = await revenueRes.json();

      setBarData(Array.isArray(salesData) ? salesData : []);
      setPieData(Array.isArray(revenueData) ? revenueData : []);
    } catch (err) {
      console.log(err);
    }
  };

  // màu pastel nhẹ nhàng
  const COLORS = ["#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899"];

  return (
    <AdminLayout>
      <div className="p-6 bg-pink-50 min-h-screen">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-pink-600">
          Dashboard
        </h1>

        {/* ===== CARDS ===== */}
        <div className="grid grid-cols-4 gap-6 mb-6">

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Users</p>
            <h2 className="text-2xl font-bold text-pink-500">
              {stats.users || 0}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Products</p>
            <h2 className="text-2xl font-bold text-pink-500">
              {stats.products || 0}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Orders</p>
            <h2 className="text-2xl font-bold text-pink-500">
              {stats.orders || 0}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-pink-400 to-pink-300 text-white p-5 rounded-2xl shadow">
            <p>Revenue</p>
            <h2 className="text-2xl font-bold">
              {stats.revenue || 0}$
            </h2>
          </div>

        </div>

        {/* ===== CHART ===== */}
        <div className="grid grid-cols-2 gap-6">

          {/* BAR CHART */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="mb-4 font-semibold text-gray-700">
              Top sản phẩm bán chạy
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#f472b6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="mb-4 font-semibold text-gray-700">
              Doanh thu theo sản phẩm
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}