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

export const update = async (req, res) => {
  const { id } = req.params;   // id cart
  const { qty } = req.body;
  // console.log(id)
  // console.log(qty)

  try {
    const updateQty = await updateCart(id, qty);
    res.status(200).json({
      message: "update cart success",
      data: updateQty,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getById = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await getCartById(userId);
    res.status(200).json({
      message: "get cart success",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};


export const deleteItem = async (req, res) => {
  const { id } = req.params;  // cart id
  const userId = req.user.id;  // dari jwt
  // console.log(userId)

  try {
      await deleteItemCart(id, userId);
      res.status(200).json({
        message: "item berhasil dihapus dari cart"
      })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}