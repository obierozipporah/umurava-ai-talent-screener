import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import screeningRoutes from "./routes/screening.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", screeningRoutes);
app.use("/api", dashboardRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});