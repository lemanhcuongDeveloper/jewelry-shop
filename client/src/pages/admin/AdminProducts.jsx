import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  // ================= FETCH =================
  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= ADD / UPDATE =================
  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      alert("Thiếu dữ liệu!");
      return;
    }

    if (editingId) {
      await fetch(`http://localhost:5000/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Cập nhật thành công!");
    } else {
      await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Thêm sản phẩm thành công!");
    }

    setForm({ name: "", price: "", image: "" });
    setEditingId(null);
    fetchProducts();
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;

    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // ================= EDIT =================
  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gradient-to-br from-pink-50 to-white min-h-screen">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-black-500">
          Quản lý sản phẩm
        </h1>

        {/* FORM */}
        <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg mb-6 border border-pink-100">
          <h2 className="font-semibold mb-4 text-gray-700">
            {editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <input
              placeholder="Tên sản phẩm"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="p-3 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />

            <input
              placeholder="Giá"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="p-3 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />

            <input
              placeholder="Link ảnh"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
              className="p-3 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-5 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
          >
            {editingId ? "Cập nhật" : "Thêm sản phẩm"}
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg border border-pink-100">
          <table className="w-full text-gray-700">
            <thead>
              <tr className="border-b text-pink-500">
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-pink-50 transition"
                >
                  <td>{p.id}</td>

                  <td>
                    <img
                      src={p.image}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  </td>

                  <td className="font-medium">{p.name}</td>

                  <td className="text-pink-500 font-semibold">
                    ${p.price}
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-300 px-3 py-1 rounded-lg hover:bg-yellow-400"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500"
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