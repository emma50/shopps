import nc from "next-connect";
import authMiddleware from "../../../../middleware/auth";
import Order from "../../../../models/order";

import db from "../../../../utils/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).use(authMiddleware)

handler.post(async (req, res) => {
  try {
    await db.connectDB();
    console.log('BODY--->', req.body, 'QUERY--->', req.query, 'PARAMS--->', req.params)
    const { amount, id } = req.body;
    const order_id = req.query.id;

    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "USD",
      description: "Emma50 Store",
      payment_method: id,
      confirm: true,
    });
    console.log('PAYMENT--->', payment)
    const order = await Order.findById(order_id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: payment.id,
        status: payment.status,
        email_address: payment.email_address,
      };
      await order.save();

      await db.disconnectDB();

      return res.json({
        success: true,
      });
    } else {
      await db.disconnectDB();
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    await db.disconnectDB();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
