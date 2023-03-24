import nc from "next-connect";
import slugify from "slugify";
import authMiddleWare from "../../../middleware/auth";
import adminMiddleware from "../../../middleware/admin";
import Category from "../../../models/Category";
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
    const { name } = req.body;

    await db.connectDB();

    const test = await Category.findOne({ name });

    if (test) {
      return res
        .status(400)
        .json({ message: "Category already exist, Try a different name" });
    }

    const newCategory = await new Category({ name, slug: slugify(name, { lower: true })});
    await newCategory.save()

    const categories = await Category.find({}).sort({ updatedAt: -1 })

    await db.disconnectDB();

    return res.json({
      message: `Category ${name} has been created successfully.`,
      categories,
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

    await Category.findByIdAndRemove(id);

    await db.disconnectDB();

    return res.json({
      message: "Category has been deleted successfuly",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;

    await db.connectDB();

    await Category.findByIdAndUpdate(id, { name, slug: slugify(name, { lower: true })});

    await db.disconnectDB();

    return res.json({
      message: "Category has been updated successfuly",
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
