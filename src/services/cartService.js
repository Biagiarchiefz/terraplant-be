import { prisma } from "../config/prismaConfig.js";

export const addCart = async (userId, plantId, qty) => {
  const existingCart = await prisma.cart.findFirst({
    where: {
      userId: userId,
      plantId: plantId,
    },
  });

  if (existingCart) {
    const updated = await prisma.cart.update({
      where: { id: existingCart.id },
      data: {
        qty: existingCart.qty + qty, // tambah
      },
    });
    return updated;
  }

  const newCart = await prisma.cart.create({
    data: { userId, plantId, qty },
  });

  return newCart;
};