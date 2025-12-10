import jwt from "jsonwebtoken";
import { getUserData } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const user = getUserData(token);
    req.user = user; // { id: "6934cba033d41729ea08fa90", email: "...", role: "..."}
    next(); // artinya boleh lanjut ke bagian berikutnya. atau route berikutnya, selah middleware ini kan mengarah ke kontroller
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};
