import nc from "next-connect";
import db from '../../../utils/db'
import validateEmail from "../../../utils/validation";
import { sendEmail } from "../../../utils/sendEmails";
import User from "../../../models/users";
import { createResetToken } from "../../../utils/token";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";

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
    const connectDb = await db.connectDB()
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'The Email field is required' })
    }
         
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'This email does mot exist' })
    }
  
    const resetToken = createResetToken({
      id: user._id.toString()
    }) 
    
    const url = `${process.env.BASE_URL}/auth/reset/${resetToken}`

    sendEmail(email, url, 'Reset your password', resetEmailTemplate)

    await db.disconnectDB()

    return res.status(200).json({
      message: `An email has been sent to ${email} to reset your password.`
    })
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
})

export default handler