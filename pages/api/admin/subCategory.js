import nc from "next-connect";
import slugify from "slugify";
import authMiddleWare from "../../../middleware/auth";
import adminMiddleware from "../../../middleware/admin";
import Category from "../../../models/Category";
import SubCategory from "../../../models/subCategory";
import db from "../../../utils/db";

const handler = nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  })
  .use(authMiddleWare)
  .use(adminMiddleware);

handler.post(async (req, res) => {
  try {
    const { name, parent } = req.body;

    await db.connectDB();

    const test = await SubCategory.findOne({ name });

    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }

    const newSubCategory = await new SubCategory({ 
      name,
      parent,
      slug: slugify(name, { lower: true })
    });
    await newSubCategory.save()

    const subCategories = await SubCategory.find({}).sort({ updatedAt: -1 })

    await db.disconnectDB();

    return res.json({
      message: `SubCategory ${name} has been created successfully.`,
      subCategories,
    });
  } catch (error) {
    await db.disconnectDB();
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;

    await db.connectDB();

    await SubCategory.findByIdAndRemove(id);

    const subCategories = await SubCategory.find({}).sort({ updatedAt: -1 })
  
    await db.disconnectDB();

    return res.json({
      message: "Category has been deleted successfuly",
      subCategories
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;

    await db.connectDB();

    await SubCategory.findByIdAndUpdate(id, {
      name, 
      parent, 
      slug: slugify(name, { lower: true })
    });

    await db.disconnectDB();

    return res.json({
      message: "Category has been updated successfuly",
      subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
