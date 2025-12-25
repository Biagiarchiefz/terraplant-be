import {
  getOrderDetail,
  getUserOrders,
  updateStatusOrder,
} from "../services/orderService.js";

export const order = async (req, res) => {
  const userId = req.user.id;
  // console.log(userId)
  try {
    const response = await getUserOrders(userId);
    res.status(200).json({
      message: "get all order success",
      data: response,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const OrderDetail = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  try {
    const order = await getOrderDetail(orderId, userId);
    res.status(200).json({
      message: "get detail order success",
      data: order,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const complateOrder = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  try {
    const order = await updateStatusOrder(orderId, userId);

    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.status(200).json({
      message: "update statu complate order succes",
      data: order,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};