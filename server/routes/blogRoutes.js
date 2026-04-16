import express from "express";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getBlogs); // public
router.post("/", verifyToken, isAdmin, createBlog);
router.put("/:id", verifyToken, isAdmin, updateBlog);
router.delete("/:id", verifyToken, isAdmin, deleteBlog);

export default router;