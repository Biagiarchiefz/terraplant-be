import express from "express";
import {
  login,
  me,
  register,
  googleLogin,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/google-login", googleLogin);

// route ini di protect oleh middleware ( middleware ini sma seperti penjaga gerbang, dia akan mengecek setiap req client )
router.get("/me", authMiddleware, me);

export { router as authRoute };
