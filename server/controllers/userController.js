import db from "../config/db.js";

// GET ALL USERS
export const getUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, role } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, role=? WHERE id=?",
    [name, email, role, id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Updated" });
    }
  );
};

export const createUser = (req, res) => {
  const { name, email, password, role } = req.body;

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Created" });
    }
  );
};
// DELETE USER
export const deleteUser = (req, res) => {
  const id = req.params.id;

  // xóa cart_items trước
  db.query(
    "DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id=?)",
    [id],
    () => {
      // xóa carts
      db.query("DELETE FROM carts WHERE user_id=?", [id], () => {
        // xóa user
        db.query("DELETE FROM users WHERE id=?", [id], (err) => {
          if (err) return res.json(err);
          res.json({ message: "Deleted OK" });
        });
      });
    }
  );
};