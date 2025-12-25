export const adminMiddleware = (req, res, next) => {
  // authMiddleware harus dijalankan dulu, baru ke adminMiddleware
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Access denied. Admin only.",
    });
  }

  next(); // lanjut ke controller
};