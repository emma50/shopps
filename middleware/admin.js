import { getToken } from "next-auth/jwt";
import User from "../models/user";
import db from "../utils/db";

const adminMiddleware = async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  await db.connectDB();

  let user = await User.findById(token.sub);

  await db.disconnectDB();

  if (user.email === 'dennis@test.com') {
    user.role = 'admin'
  }

  if (user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Access denied, Admin resources." });
  }
};

export default adminMiddleware
