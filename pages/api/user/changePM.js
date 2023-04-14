import nc from "next-connect";
import User from "../../../models/user";
import db from "../../../utils/db";
import authMiddleware from "../../../middleware/auth";

const handler = nc().use(authMiddleware);

handler.put(async (req, res) => {
  try {
    await db.connectDB();

    const { paymentMethod } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: req.user },
      {defaultPaymentMethod: paymentMethod,},
      {returnDocument: 'after'}
    )

    await db.disconnectDB();

    return res.json({ paymentMethod: user.defaultPaymentMethod });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
