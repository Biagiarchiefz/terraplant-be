import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  checkout,
  paymentNotification,
} from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/", authMiddleware, checkout);
router.post("/notification", paymentNotification); // endpoint untuk Midtrans callback

export { router as checkoutRoute };
