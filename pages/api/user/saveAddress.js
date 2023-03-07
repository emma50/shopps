import nc from "next-connect";
import db from '../../../utils/db'
import Cart from '../../../models/cart'
import Product from '../../../models/product'
import User from '../../../models/user'

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

    const { address, userId } = req.body
    
    const user = await User.findById(userId)

    if (!user) {
      console.log('NO USER')
      return res.status(404).json({message: 'User not found'})
    }

    await user.updateOne({
      $push: {
        address
      } 
    })
    
    return res.status(200).json(address)
  } catch(e) {
    res.status(500).json({ message: e.message })
  }
})

export default handler