import { prisma } from "../config/prismaConfig.js";


export const getAllUsersForAdmin = async () => {
  return prisma.user.findMany({
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      nama: true,
      email: true,
      alamat: true,
      no_hp: true,
      role: true,
    },
  });
};


export const deleteUserByAdmin = async (userId, adminId) => {
  // 1. admin tidak boleh hapus diri sendiri
  if (userId === adminId) {
    const error = new Error("Admin tidak boleh menghapus akunnya sendiri");
    error.statusCode = 400;
    throw error;
  }

  // cek user ada atau tidak
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    const error = new Error("User tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  // hapus user
  await prisma.user.delete({
    where: { id: userId }
  });

  return {
    message: "User berhasil dihapus"
  };
};



export const updateUserRoleService = async (userId, role) => {
  // cek user ada atau tidak
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("user tidak ditemukan");
  }

  // update role
  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      nama: true,
      email: true,
      role: true,
      updated_at: true,
    },
  });
};