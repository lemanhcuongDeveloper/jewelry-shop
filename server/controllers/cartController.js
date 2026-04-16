import db from "../config/db.js";

export const addToCart = (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity = 1 } = req.body;

  db.query(
    "SELECT * FROM carts WHERE user_id = ?",
    [user_id],
    (err, cartData) => {
      if (cartData.length === 0) {
        db.query(
          "INSERT INTO carts (user_id) VALUES (?)",
          [user_id],
          (err, result) => {
            const cart_id = result.insertId;
            addItem(cart_id);
          }
        );
      } else {
        addItem(cartData[0].id);
      }
    }
  );

  function addItem(cart_id) {
    db.query(
      "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cart_id, product_id],
      (err, item) => {
        if (item.length > 0) {
          db.query(
            "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
            [quantity, item[0].id],
            () => res.json({ message: "Updated" })
          );
        } else {
          db.query(
            "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
            [cart_id, product_id, quantity],
            () => res.json({ message: "Added" })
          );
        }
      }
    );
  }
};

export const getCart = (req, res) => {
  const user_id = req.user.id;

  db.query(
    `SELECT 
        cart_items.id,
        products.name,
        products.price,
        products.image,
        cart_items.quantity
     FROM cart_items
     JOIN carts ON cart_items.cart_id = carts.id
     JOIN products ON cart_items.product_id = products.id
     WHERE carts.user_id = ?`,
    [user_id],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};
// UPDATE
export const updateQuantity = (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;

  db.query(
    "UPDATE cart_items SET quantity=? WHERE id=?",
    [quantity, id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Updated" });
    }
  );
};

// DELETE
export const deleteItem = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM cart_items WHERE id=?",
    [id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Deleted" });
    }
  );
};