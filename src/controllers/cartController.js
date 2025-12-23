import { addCart } from "../services/cartService.js";

export const add = async (req, res) => {
  const userId = req.user.id;
  const { plantId, qty } = req.body;

  try {
    const Cart = await addCart(userId, plantId, qty);

    res.status(200).json({
      message: "add cart success",
      data: Cart,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
