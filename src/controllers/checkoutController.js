import {
  checkoutPlant,
  updateOrderStatus,
} from "../services/checkoutService.js";
import { verifySignature } from "../services/midtransService.js";

export const checkout = async (req, res) => {
  const userId = req.user.id; // dari JWT
  const { fullName, address, city, state, zipCode, phone, paymentMethod } =
    req.body;

  try {
    const checkoutData = {
      fullName,
      address,
      city,
      state,
      zipCode,
      phone,
      paymentMethod,
    };
    const response = await checkoutPlant(userId, checkoutData);
    res.status(200).json({
      message: "checkout berhasil",
      orderId: response.orderId,
      paymentToken: response.paymentToken,
      redirectUrl: response.redirectUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const paymentNotification = async (req, res) => {
  try {
    const {
      order_id,
      transaction_status,
      fraud_status,
      signature_key,
      status_code,
      gross_amount,
    } = req.body;

    // Verifikasi signature
    const expectedSignature = verifySignature(
      order_id,
      status_code,
      gross_amount,
      process.env.MIDTRANS_SERVER_KEY
    );

    if (signature_key !== expectedSignature) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    let orderStatus = "pembayaran";

    // Update status berdasarkan transaction_status dari Midtrans
    if (transaction_status === "capture") {
      if (fraud_status === "accept") {
        orderStatus = "diproses";
      }
    } else if (transaction_status === "settlement") {
      orderStatus = "diproses";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      orderStatus = "dibatalkan";
    } else if (transaction_status === "pending") {
      orderStatus = "pembayaran";
    }

    await updateOrderStatus(order_id, orderStatus);

    res.status(200).json({ message: "Notification processed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
