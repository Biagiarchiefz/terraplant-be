import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { prisma } from "./config/prismaConfig.js";
import { authRoute } from "./routes/authRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "get data success",
    data: {
      title: "bunga sakuran",
      harga: 20000,
    },
  });
});

console.log("PORT:", port);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
