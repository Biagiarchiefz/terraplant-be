import * as yup from "yup";

import { loginService, profileService, registerService } from "../services/authService.js";

export const registerSchema = yup.object({
  nama: yup.string().min(3, "Nama minimal 3 karakter").required("Nama wajib diisi"),

  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),

  password: yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password dan confirm password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),

  password: yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
});

export const register = async (req, res) => {
  try {
    const { nama, email, password, confirmPassword } = req.body;

    await registerSchema.validate({
      nama: nama,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });

    const user = await registerService(req.body);
    res.status(201).json({ message: "Register success", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    await loginSchema.validate({
      email: email,
      password: password,
    });

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
    const { id } = req.user;
    const user = await profileService(id);
    res.status(200).json({
      message: "succes get profile user",
      data: user,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
