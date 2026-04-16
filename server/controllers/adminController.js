import db from "../config/db.js";
import bcrypt from "bcrypt";
// 🔥 DASHBOARD
export const getDashboard = (req, res) => {
  db.query("SELECT COUNT(*) AS users FROM users", (err, u) => {
    db.query("SELECT COUNT(*) AS products FROM products", (err, p) => {
      db.query("SELECT COUNT(*) AS orders FROM carts", (err, o) => {
        res.json({
          users: u[0].users,
          products: p[0].products,
          orders: o[0].orders,
        });
      });
    });
  });
};
// 📊 SALES BY PRODUCT
export const getSalesByProduct = (req, res) => {
  db.query(
    `
    SELECT p.name, SUM(ci.quantity) AS sales
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    GROUP BY p.id
    ORDER BY sales DESC
    LIMIT 5
    `,
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};

// 📊 REVENUE BY PRODUCT
export const getRevenueByProduct = (req, res) => {
  db.query(
    `
    SELECT p.name, SUM(ci.quantity * p.price) AS value
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    GROUP BY p.id
    `,
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};

export const createUser = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.json({ error: "Thiếu dữ liệu!" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Thêm user thành công" });
    }
  );
};

export const getUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};
// UPDATE
export const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, role } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, role=? WHERE id=?",
    [name, email, role, id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Cập nhật thành công" });
    }
  );
};
// DELETE
export const deleteUser = (req, res) => {
  const id = req.params.id;

  
  db.query("DELETE FROM carts WHERE user_id = ?", [id], (err) => {
    if (err) return res.json(err);

    
    db.query("DELETE FROM users WHERE id = ?", [id], (err2) => {
      if (err2) return res.json(err2);
      res.json({ message: "Deleted" });
    });
  });
};

export const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    res.json(data);
  });
};

export const addProduct = (req, res) => {
  const { name, price, image } = req.body;

  db.query(
    "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    () => res.json({ message: "Đã thêm" })
  );
};

export const deleteProduct = (req, res) => {
  db.query("DELETE FROM products WHERE id = ?", [req.params.id], () => {
    res.json({ message: "Đã xóa" });
  });
};
// 📦 GET ALL ORDERS (ADMIN)
export const getAllOrders = (req, res) => {
  db.query(
    `
    SELECT o.id, o.created_at, u.name, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.id DESC
    `,
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};

// 📦 ORDER DETAIL
export const getOrderDetail = (req, res) => {
  const orderId = req.params.id;

  db.query(
    `
    SELECT p.name, p.price, oi.quantity, (p.price * oi.quantity) AS total
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
    `,
    [orderId],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};