import nc from "next-connect";
import db from '../../../utils/db'
import User from '../../../models/user'
import authMiddleware from "../../../middleware/auth";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).use(authMiddleware)

handler.put(async (req, res) => {
  try {
    await db.connectDB()

    const { id } = req.body
    
    const user = await User.findById(req.user)

    if (!user) {
      console.log('NO USER')
      return res.status(404).json({message: 'User not found'})
    }
    
    let user_address = user.address
    let addresses = []
    for (let i = 0; i < user_address.length; i++) {
      let temp_address = {}
      let idToString = user_address[i]._id.toString()
    
      if (idToString === id) {
        temp_address = {...user_address[i].toObject(), active: true}
        addresses.push(temp_address)
      }
      else {
        temp_address = {...user_address[i].toObject(), active: false}
        addresses.push(temp_address)
      }
    }

    /* await user.updateOne({
      addresss: addresses
    }, {new: true}) */
    user['address'] = addresses
    await user.save()

    const updatedUserData = await User.findById(req.user)

    await db.disconnectDB()
    return res.status(200).json({ addresses: updatedUserData.address })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

handler.delete(async (req, res) => {
  try {
    await db.connectDB()
    
    const { id } = req.body
    
    const user = await User.findById(req.user)

    if (!user) {
      console.log('NO USER')
      return res.status(404).json({message: 'User not found'})
    }
    
    await user.updateOne({
      $pull: { address: { _id: id } }
    })

    const updatedUserData = await User.findById(req.user)
    console.log('UPDATEDUSERDATA', updatedUserData.address)

    await db.disconnectDB()
    return res.status(200).json({ addresses: updatedUserData.address })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler