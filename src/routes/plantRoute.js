import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/plantController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", authMiddleware, getById);
router.post("/", authMiddleware, upload.single("gambar"), create);
router.put("/:id", authMiddleware, upload.single("gambar"), update);
router.delete("/:id", authMiddleware, remove);

export { router as plantRoute };
