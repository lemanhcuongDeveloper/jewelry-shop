import db from "../config/db.js";

// GET ALL BLOGS
export const getBlogs = (req, res) => {
  db.query("SELECT * FROM blogs ORDER BY id DESC", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

// CREATE BLOG
export const createBlog = (req, res) => {
  const { title, content, image } = req.body;

  db.query(
    "INSERT INTO blogs (title, content, image) VALUES (?, ?, ?)",
    [title, content, image],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Thêm blog thành công" });
    }
  );
};

// UPDATE BLOG
export const updateBlog = (req, res) => {
  const { title, content, image } = req.body;

  db.query(
    "UPDATE blogs SET title=?, content=?, image=? WHERE id=?",
    [title, content, image, req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Cập nhật thành công" });
    }
  );
};

// DELETE BLOG
export const deleteBlog = (req, res) => {
  db.query("DELETE FROM blogs WHERE id=?", [req.params.id], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Đã xóa" });
  });
};