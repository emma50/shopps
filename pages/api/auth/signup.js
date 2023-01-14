import nc from "next-connect";
import db from '../../../utils/db'
import validateEmail from "../../../utils/validation";

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

    return res.status(200).json({ message: req.body })
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
})

export default handler