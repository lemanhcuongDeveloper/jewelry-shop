import jwt from "jsonwebtoken";

const SECRET = "MY_SECRET_KEY";

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.json({ error: "Chưa đăng nhập!" });
  }

 
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.json({ error: "Token không hợp lệ!" });
    }

    req.user = decoded;
    next();
  });
};
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ error: "Không có quyền" });
  }
  next();
};