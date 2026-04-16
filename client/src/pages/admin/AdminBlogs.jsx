import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH
  const fetchBlogs = () => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then(setBlogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // SUBMIT
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("Thiếu dữ liệu");
      return;
    }

    const url = editingId
      ? `http://localhost:5000/blogs/${editingId}`
      : "http://localhost:5000/blogs";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ title: "", content: "", image: "" });
    setEditingId(null);
    fetchBlogs();
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm("Xóa blog?")) return;

    await fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBlogs();
  };

  // EDIT
  const handleEdit = (b) => {
    setForm(b);
    setEditingId(b.id);
  };

  return (
    <AdminLayout>
      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6 text-pink-500">
          Quản lý Blog
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 border border-pink-100">
          <h2 className="mb-4 font-semibold">
            {editingId ? "Cập nhật blog" : "Thêm blog"}
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <input
              placeholder="Tiêu đề"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Ảnh"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
              className="border p-2 rounded"
            />

            <textarea
              placeholder="Nội dung"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              className="border p-2 rounded col-span-3"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            {editingId ? "Cập nhật" : "Thêm"}
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white p-6 rounded-xl shadow border border-pink-100">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="border-b py-4 flex items-center gap-4"
            >
              <img
                src={b.image}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-bold">{b.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {b.content}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}