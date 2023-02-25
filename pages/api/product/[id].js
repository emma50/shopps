import nc from "next-connect";
import Product from "../../../models/product";
import db from '../../../utils/db'

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})

handler.get(async (req, res) => {
  try {
    await db.connectDB()

    const { id, size, style } = req.query
    const product = await Product.findById(id).lean()
    const discount = product.subProducts[style].discount
    const priceBefore = product.subProducts[style].sizes[size].price.toFixed(2)
    const price = discount ?  (priceBefore - ((priceBefore * discount) / 100)).toFixed(2) : priceBefore
    
    res.status(200).json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style].sku,
      brand: product.brand,
      category: product.category,
      subCategories: product.subCategories,
      shipping: product.shipping,
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price,
      priceBefore,
      discount,
      quantity: product.subProducts[style].sizes[size].qty,
    })
  } catch(e) {
    return res.status(500).json({ message: e.message })
  }
})

export default handler
