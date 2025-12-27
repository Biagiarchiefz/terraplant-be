import express, { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  complateOrder,
  order,
  OrderDetail,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", authMiddleware, order);
router.get("/:id", authMiddleware, OrderDetail);
router.patch("/:id/complete", authMiddleware, complateOrder);

export { router as orderRoute };