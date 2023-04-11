import nc from "next-connect";
import User from "../../../models/user";
import db from "../../../utils/db";
import authMiddleware from "../../../middleware/auth";

const handler = nc().use(authMiddleware);

handler.put(async (req, res) => {
  try {
    await db.connectDB();

    const { product_id, style } = req.body;

    const user = await User.findById(req.user);

    const exist = user.wishlist.find(
      (x) => x.product == product_id && x.style === style
    );

    if (exist) {
      return res
        .status(400)
        .json({ message: "Product already exists in your wishlist." });
    }

    await user.updateOne({
      $push: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });

    await db.disconnectDB();

    return res.status(200).json({
      message: "Product succesfully added to your wishlist." 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
