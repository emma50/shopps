import nc from "next-connect";
import bcrypt from 'bcrypt'
import db from '../../../utils/db'
import User from "../../../models/users";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})

handler.put(async (req, res) => {
  try {
    await db.connectDB()
    const { userId, password } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'This account does not exist' })
    }

    // Compare incoming passord with the password in the database
    const comparePassword = await bcrypt.compare(password, user.password)
    if (comparePassword) {
      return res.status(200).json({
        message: `Cannot use the same password.`
      })
    } 

    const cryptedPassword = await bcrypt.hash(password, 12)
    
    await user.updateOne({
      password: cryptedPassword
    })

    await db.disconnectDB()

    return res.status(200).json({
      message: `You have successfully reset your password.`,
      email: user.email
    })
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
})

export default handler