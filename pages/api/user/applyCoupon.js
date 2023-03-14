import nc from "next-connect";
import db from '../../../utils/db'
import User from '../../../models/user'
import Coupon from '../../../models/coupon'
import Cart from "../../../models/cart";
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

    const { coupon } = req.body
    
    const user = await User.findById(req.user)

    if (!user) {
      console.log('NO USER')
      return res.status(404).json({message: 'User not found'})
    }

    const checkCoupon = await Coupon.findOne({ coupon });
    console.log(checkCoupon)

    if (!checkCoupon) {
      return res.json({ message: "Invalid coupon" });
    }

    const { cartTotal } = await Cart.findOne({ user: req.user });

    let totalAfterDiscount = cartTotal - (cartTotal * checkCoupon.discount) / 100;
console.log('TOTALAFTERDISCOUNT-->', totalAfterDiscount)
    await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount }); 

    await db.disconnectDB()

    return res.status(200).json({
      totalAfterDiscount,
      discount: checkCoupon.discount
    })
    // return res.status(200).json({ addresses: updatedUser.address })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler