import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Thiếu dữ liệu!");

    const url = editingId
      ? `http://localhost:5000/admin/users/${editingId}`
      : "http://localhost:5000/admin/users";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", password: "", role: "user" });
    setEditingId(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!confirm("Xóa user này?")) return;

    await fetch(`http://localhost:5000/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  const handleEdit = (u) => {
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
    });
    setEditingId(u.id);
  };

 return (
  <AdminLayout>
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Quản lý người dùng
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8">
        <h2 className="text-lg mb-4 text-gray-700">
          {editingId ? "Cập nhật User" : "Thêm User"}
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            placeholder="Tên"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="p-2 rounded-lg border border-gray-200 focus:border-yellow-400 outline-none"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="p-2 rounded-lg border border-gray-200 focus:border-yellow-400 outline-none"
          />

          {!editingId && (
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="p-2 rounded-lg border border-gray-200 focus:border-yellow-400 outline-none"
            />
          )}

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            className="p-2 rounded-lg border border-gray-200 focus:border-yellow-400 outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 px-6 py-2 rounded-lg bg-yellow-400 text-white font-medium hover:bg-yellow-500 transition"
        >
          {editingId ? "Cập nhật" : "Thêm"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 text-gray-700">{u.id}</td>
                <td className="text-gray-800 font-medium">
                  {u.name}
                </td>
                <td className="text-gray-600">{u.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      u.role === "admin"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(u.id)}
                    className="px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </AdminLayout>
);
}