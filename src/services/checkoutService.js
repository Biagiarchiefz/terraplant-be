import { prisma } from "../config/prismaConfig.js";

export const checkoutPlant = async (userId, checkoutData) => {
  const { fullName, address, city, state, zipCode, phone, paymentMethod } =
    checkoutData;

  // 1. ambil cart user
  const carts = await prisma.cart.findMany({
    where: { userId },
  });

  if (carts.length === 0) {
    throw new Error("Cart kosong");
  }

  // 2️. Ambil plant
  const plantIds = carts.map((c) => c.plantId);
  const plants = await prisma.plant.findMany({
    where: { id: { in: plantIds } },
  });

  // 3️. Hitung total
  let totalHarga = 0;

  const orderItemsData = carts.map((cart) => {
    const plant = plants.find((p) => p.id === cart.plantId);

    if (!plant) throw new Error("Produk tidak ditemukan");

    const subtotal = plant.harga * cart.qty;
    totalHarga += subtotal;

    return {
      plantId: plant.id,
      nama: plant.nama,
      harga: plant.harga,
      qty: cart.qty,
      gambar: plant.gambar[0] || "", // ambil gambar pertama dari array
    };
  });

  // 4️. Buat Order
  const order = await prisma.order.create({
    data: {
      userId,
      fullName,
      address,
      city,
      state,
      zipCode,
      phone,
      paymentMethod,
      status: "diproses",
      totalHarga,
    },
  });

  // 5️. Buat OrderItem
  await prisma.orderItem.createMany({
    data: orderItemsData.map((item) => ({
      ...item,
      orderId: order.id,
    })),
  });

  // 6️. Kosongkan Cart
  await prisma.cart.deleteMany({
    where: { userId },
  });

  return order.id;
};