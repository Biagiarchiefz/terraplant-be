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