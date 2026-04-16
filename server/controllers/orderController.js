import db from "../config/db.js";

// GET ALL
export const getAllOrders = (req, res) => {
  db.query(
    `
    SELECT 
      o.id,
      u.name,
      u.email,
      o.status,
      COALESCE(SUM(oi.quantity * oi.price), 0) AS total
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id
    `,
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};

// DETAIL
export const getOrderDetail = (req, res) => {
  db.query(
    `
    SELECT 
      oi.quantity,
      oi.price,
      p.name,
      p.image
    FROM order_items oi
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
    `,
    [req.params.id],
    (err, data) => {
      if (err) return res.json(err);
      res.json(data);
    }
  );
};

// UPDATE STATUS
export const updateOrderStatus = (req, res) => {
  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [req.body.status, req.params.id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Updated" });
    }
  );
};