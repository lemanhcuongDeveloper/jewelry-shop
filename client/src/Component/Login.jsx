import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Vui lòng nhập đầy đủ!");
      return;
    }

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login thành công!");
      navigate("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      
    
      <Header />

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white w-[380px] p-8 rounded-2xl shadow-lg">
          
          <h2 className="text-2xl font-semibold text-center mb-6">
            Đăng nhập
          </h2>

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
            className="w-full p-3 border rounded-lg mb-4"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Đăng nhập
          </button>

          <p
            onClick={() => navigate("/register")}
            className="text-center mt-4 text-sm cursor-pointer"
          >
            Chưa có tài khoản? Đăng ký
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}