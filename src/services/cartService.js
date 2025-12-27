// import { prisma } from "../config/prismaConfig.js";

// export const addCart = async (userId, plantId, qty) => {
//   const existingCart = await prisma.cart.findFirst({
//     where: {
//       userId: userId,
//       plantId: plantId,
//     },
//   });

//   if (existingCart) {
//     const updated = await prisma.cart.update({
//       where: { id: existingCart.id },
//       data: {
//         qty: existingCart.qty + qty, // tambah
//       },
//     });
//     return updated;
//   }

//   const newCart = await prisma.cart.create({
//     data: { userId, plantId, qty },
//   });

//   return newCart;
// };

// export const updateCart = async (id, qty) => {
//   const update = await prisma.cart.update({
//     where: {
//       id: id,
//     },
//     data: {
//       qty: qty, // qty diupdate
//     },
//   });

//   return update;
// };

// export const deleteItemCart = async (cartId, userId) => {
//   // 1️. Pastikan cart milik user
//   const cart = await prisma.cart.findFirst({
//     where: {
//       id: cartId,
//       userId: userId,
//     },
//   });

//   if (!cart) {
//     return res.status(404).json({
//       message: "Item cart tidak ditemukan",
//     });
//   }

//   // 2️. Delete cart
//   return await prisma.cart.delete({
//     where: { id: cartId },
//   });
// };

// export const getCartById = async (userId) => {
//   // 1. ambil cart user
//   // ambil semua isi keranjang milik user ini
//   const cart = await prisma.cart.findMany({
//     where: {
//       userId: userId,
//     },
//   });

//   // 2. Ambil semua plantId dari cart
//   // catat semua id tanaman yang ada di keranjang
//   const plantIds = cart.map((item) => item.plantId);

//   // 3. Ambil data plant ( manual )
//   // mengambil data tanaman berdasarkan ID yang ada di kerjangnya
//   const plants = await prisma.plant.findMany({
//     where: {
//       id: {
//         in: plantIds,
//       },
//     },
//   });

//   // 4. Gabungkan cart + plant
//   const cartWithTotal = cart.map((item) => {
//     // find mengembalikan element pertama dalam array yang memenuhi kondisi callbacknya
//     // cari tanaman yang ID-nya sama dengan plantId di keranjang
//     const plant = plants.find((p) => p.id === item.plantId);

//     return {
//       id: item.id,
//       plantId: item.plantId,
//       nama: plant?.nama,
//       harga: plant?.harga,
//       qty: item.qty,
//       total: item.qty * (plant?.harga || 0),
//     };
//   });

//   const grandTotal = cartWithTotal.reduce((sum, item) => sum + item.total, 0);

//   // return cartWithTotal;
//   return {
//     items: cartWithTotal,
//     grandTotal,
//   };
// };