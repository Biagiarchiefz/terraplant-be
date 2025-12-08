import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcryptjs";


export const registerService = async (data) => {
  const { nama, email, password } = data;

  // cek ke db apakah email sudah terdaftar
  const exists = await prisma.user.findUnique({ where: { email } });
  // jik email sudah terdaftar throw error
  if (exists) throw new Error("Email sudah terdaftar");

  // bcrypt handle password
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      nama,
      email,
      password: hashed,
    },
  });

  return user;
};


export const loginService = async (data) => {
  const { email, password } = data;

  // mengembalikan satu data user
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("User tidak ditemukan");

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error("Password tidak valid");

  const token = generateToken(user);

  return { user, token };
};