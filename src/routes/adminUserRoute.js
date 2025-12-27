import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { deleteUser, getAdminUsers, updateUserRoleController } from "../controllers/adminUserController.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getAdminUsers);
router.patch("/users/:id/role", authMiddleware, adminMiddleware, updateUserRoleController)
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser)


export { router as adminUserRoute }