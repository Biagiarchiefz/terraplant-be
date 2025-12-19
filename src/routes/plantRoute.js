import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { create, getAll, getById, remove, update } from "../controllers/plantController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", authMiddleware, getById);
router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export { router as plantRoute };
