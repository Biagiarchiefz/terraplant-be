import { prisma } from "../config/prismaConfig.js";

export const getTopSellingPlantService = async () => {
  // 1. Ambil order yang selesai
  const completedOrders = await prisma.order.findMany({
    where: {
      status: "selesai",
    },
    select: {
      id: true,
    },
  });

  if (completedOrders.length === 0) {
    return null;
  }

  const orderIds = completedOrders.map(order => order.id);

  // 2. Ambil semua item dari order selesai
  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: {
        in: orderIds,
      },
    },
  });

  if (orderItems.length === 0) {
    return null;
  }

  // 3. Hitung tanaman terlaris
  const plantMap = {};

  orderItems.forEach(item => {
    if (!plantMap[item.plantId]) {
      plantMap[item.plantId] = {
        plantId: item.plantId,
        nama: item.nama,
        totalTerjual: 0,
        totalPendapatan: 0,
      };
    }

    plantMap[item.plantId].totalTerjual += item.qty;
    plantMap[item.plantId].totalPendapatan += item.harga * item.qty;
  });

  // 4. Ambil tanaman terlaris
  const topSellingPlant = Object.values(plantMap).sort(
    (a, b) => b.totalTerjual - a.totalTerjual
  ).slice(0, 5);

  return topSellingPlant;
};