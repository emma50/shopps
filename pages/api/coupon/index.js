import nc from "next-connect";
import db from '../../../utils/db'
import User from '../../../models/user'
import Coupon from "../../../models/coupon";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})


handler.post(async (req, res) => {
  try {
    await db.connectDB()
 
    const { coupon, startDate, endDate, discount } = req.body
    const test = await Coupon.findOne({coupon})

    if (test) {
      return res.status(400).json({ 
        message: 'This coupon name already exists. Try with a different name' 
      })
    }

    const newCoupon = await new Coupon({
      coupon,
      startDate,
      endDate,
      discount
    })
    await newCoupon.save()

    const coupons = await Coupon.find({})

    await db.disconnectDB()
    return res.status(200).json({
      message: 'Coupon created successfully',
      coupons: coupons
    })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler