import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false, // ubah ke true untuk production
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const createTransaction = async (orderData) => {
  const { orderId, totalHarga, fullName, email, phone, itemDetails } =
    orderData;

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: totalHarga,
    },
    customer_details: {
      first_name: fullName,
      email: email,
      phone: phone,
    },
    item_details: itemDetails,
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return {
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    };
  } catch (error) {
    console.error("Midtrans Error:", error);
    throw new Error("Gagal membuat transaksi pembayaran");
  }
};

export const verifySignature = (
  orderId,
  statusCode,
  grossAmount,
  serverKey
) => {
  const crypto = require("crypto");
  const hash = crypto
    .createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest("hex");
  return hash;
};
