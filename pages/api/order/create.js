import nc from "next-connect";
import db from '../../../utils/db'
import Cart from '../../../models/cart'
import Product from '../../../models/product'
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
      total
    } = req.body
    
    const user = await User.findById(req.user)
    console.log('PRODUCTS-->', products, 
     'SHIPPINGADDRESS-->', shippingAddress,
     'PAYMENTMETHOD-->', paymentMethod,
     'TOTAL-->', total)

    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total
    })

    await newOrder.save()

    console.log('NEWORDER', newOrder)
    
    await db.disconnectDB()

    return res.status(200).json({
      orderId: newOrder._id
    })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler