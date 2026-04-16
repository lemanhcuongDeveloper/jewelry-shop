import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", verifyToken, createUser);
router.put("/users/:id", verifyToken, updateUser); 
router.delete("/users/:id", verifyToken, deleteUser);

export default router;