import nc from "next-connect";
import db from '../../../utils/db'
import User from '../../../models/user'
import Order from '../../../models/order'
import authMiddleware from "../../../middleware/auth";

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
    await db.connectDB()

    const { 
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied
    } = req.body
    
    const user = await User.findById(req.user)

    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied
    })

    await newOrder.save()
    
    await db.disconnectDB()

    return res.status(200).json({
      orderId: newOrder._id
    })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler