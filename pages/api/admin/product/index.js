import nc from "next-connect";
import slugify from "slugify";
import fs from 'fs'
import db from "../../../../utils/db";
import Product from "../../../../models/product";
import authMiddleware from "../../../../middleware/auth";
import adminMiddleware from "../../../../middleware/admin";
import { 
  getBrandImage, 
  getBrandImageExt,
  downloadImage 
} from "../../../../requests/brand";
import { svgToPng } from "../../../../utils/brand";

const handler = nc()
  .use(authMiddleware)
  .use(adminMiddleware);

handler.post(async (req, res) => {
  try {
    await db.connectDB();

    if (req.body.parent) {
      const parent = await Product.findById(req.body.parent);

      if (!parent) {
        return res.status(400).json({
          message: "Parent product not found !",
        });
      }
      else {
        await parent.updateOne(
          {
            $push: {
              subProducts: {
                sku: req.body.sku,
                color: req.body.color,
                images: req.body.images,
                sizes: req.body.sizes,
                discount: Number(req.body.discount),
              },
            },
          },
          { new: true }
        );
        
        try {
          const brandImage = await getBrandImage(parent.brand)
          const brandImageExt = getBrandImageExt(brandImage)
          const path = 
            `${process.cwd()}/public/images/brands/${parent.brand}.${brandImageExt}`

          fs.access(path, fs.F_OK, async (err) => {
            if (err) {
              console.error(err)
              await downloadImage(brandImage, path)
            }
          
            return;
          })

          await svgToPng(
            path, 
            `${process.cwd()}/public/images/brands/${parent.brand}.png`
          )

          fs.unlink(path, (err) => {
            if (err) {
                console.log(err)
            }
        
            console.log(`${path} deleted File successfully.`);
          });
        } catch (error) {
          console.log(error)
        }
      }
    } 
    else {
      req.body.slug = slugify(req.body.name.toLowerCase());

      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        details: req.body.details,
        questions: req.body.questions,
        slug: req.body.slug,
        category: req.body.category,
        subCategories: req.body.subCategories,
        subProducts: [
          {
            sku: req.body.sku,
            color: req.body.color,
            images: req.body.images,
            sizes: req.body.sizes,
            discount: Number(req.body.discount)
          },
        ],
      });

      await newProduct.save();

      try {
        const brandImage = await getBrandImage(newProduct.brand)
        const brandImageExt = getBrandImageExt(brandImage)
        const path =
          `${process.cwd()}/public/images/brands/${newProduct.brand}.${brandImageExt}`
        
        await downloadImage(brandImage, path)

        await svgToPng(
          path, 
          `${process.cwd()}/public/images/brands/${newProduct.brand}.png`
        )

        fs.unlink(path, (err) => {
          if (err) {
              console.log(err)
          }
      
          console.log(`${path} deleted File successfully.`);
        });
      } catch (error) {
        console.log('-----------------------------')
        console.log(error)
      }

      return res.status(200).json({ message: "Product created Successfully." });
    }

    await db.disconnectDB();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
