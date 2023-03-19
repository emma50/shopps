import nc from "next-connect";
import authMiddleware from "../../../../middleware/auth";
import Order from "../../../../models/order";
import db from "../../../../utils/db";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).use(authMiddleware)

handler.put(async (req, res) => {
  console.log("hello from api");
  await db.connectDB();

  const order = await Order.findById(req.query.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };

    const newOrder = await order.save();

    await db.disconnectDB();

    return res.json({ message: "Order is paid.", order: newOrder });
  } else {
    await db.disconnectDb();
    return res.status(404).json({ message: "Order is not found." });
  }
});

export default handler;
