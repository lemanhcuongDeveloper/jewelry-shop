
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";




const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "*", // cho phép tất cả (dễ nhất)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/blogs", blogRoutes);
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});