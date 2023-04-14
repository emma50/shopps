import nc from "next-connect";
import User from "../../../models/user";
import db from "../../../utils/db";
import authMiddleware from "../../../middleware/auth";
import bcrypt from "bcrypt";

const handler = nc().use(authMiddleware);

handler.put(async (req, res) => {
  try {
    await db.connectDB();

    const { current_password, password } = req.body;

    const user = await User.findById(req.user);

    const crypted_password = await bcrypt.hash(password, 12);

    if (!user.password) {
      await user.updateOne({
        password: crypted_password,
      });

      return res.status(200).json({
        message:
          "We noticed that you are using a social login so we added a password to login with in the future.",
      });
    }

    const isMatch = await bcrypt.compare(current_password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is wrong!" });
    }

    await user.updateOne({
      password: crypted_password,
    });

    await db.disconnectDB();

    return res.json({ message: "Password has been changed successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
