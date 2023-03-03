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

    const { cart, userId } = req.body
    let products = []
    console.log('ALLPRODUCTSINDB--->', await Product.find({}))
    let user = await User.findById(userId)

    const existingCart = await Cart.findOne({ user: userId })
    if (existingCart) {
      await existingCart.remove()
    }
    
    for (let i = 0; i < cart.length; i++ ) {
      let DbProduct = await Product.findById(cart[i]._id).lean()
      let subProduct = DbProduct.subProducts[cart[i].style]
      let tempProduct = {}
      tempProduct.name = DbProduct.name
      tempProduct.product = DbProduct._id
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image
      }
      tempProduct.image = subProduct.images[0].url
      tempProduct.qty = Number(cart[i].qty)
      tempProduct.size = cart[i].size

      let price = Number(
        subProduct.sizes.find((item) => item.size === cart[i].size).price
      )
      
      tempProduct.price = subProduct.discount 
        ? (price - ((price * subProduct.discount) / 100)).toFixed(2)
        : price.toFixed(2)

      products.push(tempProduct)
    }

    let cartTotal = 0

    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + (products[i].price * products[i].qty)
    }

    const newCart = await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id
    })

    await newCart.save()
    
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