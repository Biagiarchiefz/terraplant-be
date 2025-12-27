import { getTopSellingPlant } from "../controllers/dashboardController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express"

const router = express.Router();

router.get(
  "/dashboard/top-selling-plant",
  authMiddleware,
  adminMiddleware,
  getTopSellingPlant
);

export { router as adminTopSell };