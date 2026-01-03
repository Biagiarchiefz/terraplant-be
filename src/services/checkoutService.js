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

  // 3️. Validasi stok dan hitung total
  let totalHarga = 0;

  const orderItemsData = carts.map((cart) => {
    const plant = plants.find((p) => p.id === cart.plantId);

    if (!plant) throw new Error("Produk tidak ditemukan");

    // Validasi stok
    if (plant.stok < cart.qty) {
      throw new Error(
        `Stok ${plant.nama} tidak mencukupi`
      );
    }

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

  // 4️. Gunakan transaction untuk atomicity
  const result = await prisma.$transaction(async (tx) => {
    // Buat Order
    const order = await tx.order.create({
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

    // Buat OrderItem
    await tx.orderItem.createMany({
      data: orderItemsData.map((item) => ({
        ...item,
        orderId: order.id,
      })),
    });

    // Update stok tanaman
    for (const cart of carts) {
      await tx.plant.update({
        where: { id: cart.plantId },
        data: {
          stok: {
            decrement: cart.qty,
          },
        },
      });
    }

    // Kosongkan Cart
    await tx.cart.deleteMany({
      where: { userId },
    });

    return order.id;
  });

  return result;
};
