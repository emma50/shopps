import nc from "next-connect";
import Product from "../../models/product";
import db from '../../utils/db'

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

    const promise = req.body.products.map(async (product) => {
      const dbProduct = await Product.findById(product._id).lean()
      const originalPrice = dbProduct.subProducts[product.style].sizes.find(
        (x) => x.size === product.size
      ).price
      const quantity = dbProduct.subProducts[product.style].sizes.find(
        (x) => x.size === product.size
      ).qty
      const discount = dbProduct.subProducts[product.style].discount
     
      return {
        ...product,
        priceBefore: originalPrice,
        quantity,
        discount,
        price: discount > 0 
          ? (originalPrice - ((originalPrice * discount) / 100)).toFixed(2)
          : originalPrice.toFixed(2),
        shippingFee: dbProduct.shipping
      }
    })

    const data = await Promise.all(promise)
    await db.disconnectDB()
    
    res.status(200).json(data)
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler
