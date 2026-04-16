import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:5000/auth/login"
      : "http://localhost:5000/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login thành công!");
      window.location.href = "/";
    } else {
      alert(data.error || data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <input
            placeholder="Name"
            className="border p-2 w-full mb-2"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-pink-500 text-white w-full py-2"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 mt-3 cursor-pointer text-sm"
        >
          {isLogin
            ? "Chưa có tài khoản? Đăng ký"
            : "Đã có tài khoản? Login"}
        </p>
      </div>
    </div>
  );
}