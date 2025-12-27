import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
// import { prisma } from "./config/prismaConfig.js";
import { authRoute } from "./routes/authRoute.js";
import { plantRoute } from "./routes/plantRoute.js";
import { cartRoute } from "./routes/cartRoute.js";
import { checkoutRoute } from "./routes/checkoutRoute.js";
import { orderRoute } from "./routes/orderRoute.js";
import { adminOrderRoute } from "./routes/adminOrderRoute.js";
import { adminUserRoute } from "./routes/adminUserRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);

app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/admin", adminUserRoute);