import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route"

dotenv.config();

const app = express();
const port = process.env.API_PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is ready !");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});