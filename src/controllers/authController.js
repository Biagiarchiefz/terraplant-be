import { registerService } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({ message: "Register success", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};