import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "MY_SECRET_KEY";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role || "user"],
    (err) => {
      if (err) return res.json({ error: "Email đã tồn tại!" });

      res.json({ message: "Đăng ký thành công" });
    }
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, data) => {
      if (data.length === 0) {
        return res.json({ error: "User không tồn tại" });
      }

      const user = data[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ error: "Sai mật khẩu" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token, user });
    }
  );
};