import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
