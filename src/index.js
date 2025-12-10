import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { prisma } from "./config/prismaConfig.js";
import { authRoute } from "./routes/authRoute.js";
import plantRoute  from "./routes/plantRoute.js";



dotenv.config();
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.status(200).json({
    message: "get data success",
    data: {
      title: "bunga sakuran",
      harga: 20000,
    },
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use("/api/auth", authRoute);

app.use("/api/plants", plantRoute);


