import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,   
  deleteItem        
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.put("/item/:id", verifyToken, updateQuantity);
router.delete("/item/:id", verifyToken, deleteItem);

export default router;