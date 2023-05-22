import nc from "next-connect";
import bcrypt from 'bcrypt'
import db from '../../../utils/db'
import { validateEmail } from "../../../utils/validation";
import { sendEmail } from "../../../utils/sendEmails";
import User from "../../../models/user";
import { createActivationToken } from "../../../utils/token";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})

handler.get((req, res) => {
  res.send("Hello world");
})
.post(async (req, res) => {
  try {
    const connectDb = await db.connectDB()
    const { name, email, password } = req.body
    console.log(req.body)

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Fill in all fields' })
    }
         
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email' })
    }

    const user = await User.findOne({ email: email })
    if (user) {
      return res.status(400).json({ message: 'This email already exists' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    if (password.length > 36) {
      return res.status(400).json({ message: 'Password must not be more than 36 characters' })
    }

    const cryptedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ name, email, password: cryptedPassword })
    const addedUser =  await newUser.save()

    const activationToken = createActivationToken({
      id: addedUser._id.toString()
    })    
    const url = `${process.env.BASE_URL}/activate/${activationToken}`

    await sendEmail(email, url, 'Activate your account', activateEmailTemplate)

    await db.disconnectDB()

    return res.status(200).json({
      message: 'You successfully signed up! Please activate your email to start.',
      data: addedUser
    })
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
})

export default handler