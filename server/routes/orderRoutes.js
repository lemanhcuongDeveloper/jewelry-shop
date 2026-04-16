import express from "express";
import {
  getAllOrders,
  getOrderDetail,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllOrders);
router.get("/:id", verifyToken, isAdmin, getOrderDetail);
router.put("/:id", verifyToken, isAdmin, updateOrderStatus);

export default router;