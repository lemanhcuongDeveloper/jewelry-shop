import express from "express";
import {
  getDashboard,
  getProducts,
  addProduct,
  deleteProduct,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSalesByProduct,
  getRevenueByProduct,
  getAllOrders,
  getOrderDetail,
} from "../controllers/adminController.js";

import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();
  

router.get("/dashboard", verifyToken, isAdmin, getDashboard);
router.get("/chart/sales", verifyToken, isAdmin, getSalesByProduct);
router.get("/chart/revenue", verifyToken, isAdmin, getRevenueByProduct);

router.get("/users", verifyToken, isAdmin, getUsers);
router.post("/users", verifyToken, isAdmin, createUser);
router.put("/users/:id", verifyToken, isAdmin, updateUser);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);


router.get("/products", verifyToken, isAdmin, getProducts);
router.post("/products", verifyToken, isAdmin, addProduct);
router.delete("/products/:id", verifyToken, isAdmin, deleteProduct);

router.get("/orders", verifyToken, isAdmin, getAllOrders);
router.get("/orders/:id", verifyToken, isAdmin, getOrderDetail);
export default router;