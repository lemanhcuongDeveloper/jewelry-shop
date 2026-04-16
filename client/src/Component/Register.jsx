import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Vui lòng nhập đầy đủ!");
      return;
    }

    if (form.password.length < 6) {
      alert("Mật khẩu phải >= 6 ký tự");
      return;
    }

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert("Đăng ký thành công!");
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
      {/* 🔥 HEADER */}
      <Header />

      {/* 🔥 CONTENT */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white w-[380px] p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Đăng ký
          </h2>

          <input
            placeholder="Tên"
            className="w-full p-3 border rounded-lg mb-3"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-3"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-3 border rounded-lg mb-3"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="w-full p-3 border rounded-lg mb-4"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleRegister}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Đăng ký
          </button>

          <p
            onClick={() => navigate("/login")}
            className="text-center text-sm mt-4 cursor-pointer"
          >
            Đã có tài khoản? Đăng nhập
          </p>
        </div>
      </div>

      {/* 🔥 FOOTER */}
      <Footer />
    </div>
  );
}