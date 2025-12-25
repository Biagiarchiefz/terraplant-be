import { prisma } from "../config/prismaConfig.js";

export const updateStatusOrder = async (orderId, status) => {
  const order = prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status,
    },
  });

  return order;
};

export const getAllOrdersForAdmin = async () => {
  // 1. Ambil semua order
  const orders = await prisma.order.findMany({
    orderBy: { created_at: "desc" },
  });

  if (orders.length === 0) return [];

  // 2. Ambil semua user terkait
  const userIds = [...new Set(orders.map((o) => o.userId))];

  const users = await prisma.user.findMany({
    where: {
      id: { in: userIds },
    },
    select: {
      id: true,
      nama: true,
      email: true,
    },
  });

  const userMap = Object.fromEntries(users.map((user) => [user.id, user]));

  // 3. Ambil semua item order
  const orderIds = orders.map((o) => o.id);

  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: { in: orderIds },
    },
  });

  // Group item per order
  const orderItemMap = {};

  orderItems.forEach((item) => {
    if (!orderItemMap[item.orderId]) {
      orderItemMap[item.orderId] = [];
    }
    orderItemMap[item.orderId].push(item);
  });

  // 4. Shape data untuk admin
  return orders.map((order) => ({
    orderId: order.id,
    customer: userMap[order.userId]?.nama || "Unknown",
    date: order.created_at,
    total: order.totalHarga,
    itemCount: orderItemMap[order.id]?.length || 0,
    status: order.status,
  }));
};
