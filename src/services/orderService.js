import { prisma } from "../config/prismaConfig.js";

export const getUserOrders = async (userId) => {
  // console.log(userId);
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { created_at: "desc" },
  });

  const orderIds = orders.map((o) => o.id);

  const items = await prisma.orderItem.findMany({
    where: { orderId: { in: orderIds } },
  });

  return orders.map((order) => {
    const orderItems = items.filter((i) => i.orderId === order.id);

    const totalItem = orderItems.reduce((sum, i) => sum + i.qty, 0);
    const firstItem = orderItems[0];

    return {
      id: order.id,
      created_at: order.created_at,
      status: order.status,
      totalHarga: order.totalHarga,
      totalItem,
      preview: firstItem
        ? {
            nama:
              orderItems.length > 1
                ? `${firstItem.nama} +${orderItems.length - 1} lainnya`
                : firstItem.nama,
            gambar: firstItem.gambar || "default.jpg",
          }
        : null,
    };
  });
};

export const getOrderDetail = async (orderId, userId) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
  });

  if (!order) throw new Error("Order tidak ditemukan");

  const items = await prisma.orderItem.findMany({
    where: { orderId },
  });

  return {
    id: order.id,
    status: order.status,
    created_at: order.created_at,
    paymentMethod: order.paymentMethod,
    shipping: {
      fullName: order.fullName,
      phone: order.phone,
      address: `${order.address}, ${order.city}, ${order.state} ${order.zipCode}`,
      courier: {
        name: "SiCepat Express",
        resi: "SCP987654321",
        estimate: "20–22 Desember 2080",
      },
    },
    items,
    summary: {
      subtotal: order.totalHarga,
      ongkir: 18000,
      diskonOngkir: 18000,
      total: order.totalHarga,
    },
  };
};



export const updateStatusOrder = async (orderId, userId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
  });

  if (!order) throw new Error("Order tidak ditemukan");


  if (order.status !== "dikirim"){
    throw new Error("Pesanan belum bisa diselesaikan")
  }

    const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: "selesai" },
  });

  return updated

};