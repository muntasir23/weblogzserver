import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("It is hosting brooo....!");
});

app.use(express.json());

// auth route;
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port NO: ${PORT}`);
});
