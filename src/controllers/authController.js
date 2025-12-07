import {
  loginService,
  profileService,
  registerService,
} from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({
      message: "Register success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await loginService(req.body);
    res.status(200).json({
      message: "Login success",
      data: user,
      token: token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const me = async (req, res) => {
  try {
    const {id}= req.user;
    const user = await profileService(id);
    res.status(200).json({
      message: "succes get profile user",
      data: user,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
