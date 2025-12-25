import { checkoutPlant } from "../services/checkoutService.js";

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
      orderId: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};