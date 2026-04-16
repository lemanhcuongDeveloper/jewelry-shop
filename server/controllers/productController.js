import db from "../config/db.js";

// GET ALL
export const getProducts = (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

// CREATE
export const createProduct = (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price) {
    return res.json({ error: "Thiếu dữ liệu" });
  }

  db.query(
    "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Thêm sản phẩm thành công" });
    }
  );
};

// UPDATE
export const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, image } = req.body;

  db.query(
    "UPDATE products SET name=?, price=?, image=? WHERE id=?",
    [name, price, image, id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Cập nhật thành công" });
    }
  );
};

// DELETE
export const deleteProduct = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) {
      console.log("DELETE ERROR:", err); // ✅ đúng chỗ
      return res.json({ error: err.sqlMessage });
    }

    res.json({ message: "Xóa thành công" });
  });
};