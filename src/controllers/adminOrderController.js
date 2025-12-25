import {
  getAllOrdersForAdmin,
  updateStatusOrder,
} from "../services/adminOrderService.js";

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  // console.log(status)
  const orderId = req.params.id;

  try {
    const allowed = ["diproses", "dikirim"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    const order = await updateStatusOrder(orderId, status);
    res.status(200).json({
      message: "status berhasil diubah",
      data: order,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersForAdmin();
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data order",
    });
  }
};