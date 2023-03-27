import nc from "next-connect";
import authMiddleWare from "../../../middleware/auth";
import adminMiddleware from "../../../middleware/admin";
import Coupon from "../../../models/coupon";
import db from "../../../utils/db";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(authMiddleWare)
  .use(adminMiddleware);

handler.post(async (req, res) => {
  try {
    const { coupon, discount, startDate, endDate } = req.body;

    await db.connectDB();

    const test = await Coupon.findOne({ coupon });

    if (test) {
      return res
        .status(400)
        .json({ message: "Coupon already exist, Try a different coupon" });
    }

    const newCoupon = await new Coupon({ coupon, discount, startDate, endDate });
    await newCoupon.save()

    const coupons = await Coupon.find({}).sort({ updatedAt: -1 })

    await db.disconnectDB();

    return res.json({
      message: `Coupon ${coupon} has been created successfully.`,
      coupons,
    });
  } catch (error) {
    await db.disconnectDB();
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;

    await db.connectDB();

    await Coupon.findByIdAndRemove(id);

    await db.disconnectDB();

    return res.json({
      message: "Coupon has been deleted successfuly",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, coupon, discount, startDate, endDate } = req.body;

    await db.connectDB();

    await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate,
      endDate,
    });

    await db.disconnectDB();

    return res.json({
      message: "Coupon has been updated successfuly",
      coupons: await Coupon.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
