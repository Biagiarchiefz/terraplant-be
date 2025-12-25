import express from "express";
import { getAdminOrders, updateOrderStatus } from "../controllers/adminOrderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.patch("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);
router.get("/", authMiddleware, adminMiddleware, getAdminOrders);

export { router as adminOrderRoute };
