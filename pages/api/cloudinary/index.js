import nc from "next-connect";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fs from "fs";
import fileUpload from "express-fileupload";
import { imgMiddleware } from "../../../middleware/imgMiddleware";
import { flattenArray } from "../../../utils/arraysUtils";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const handler = nc()
  .use(
    fileUpload({
      useTempFiles: true,
    })
  )
  .use(imgMiddleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(async (req, res) => {
  try {
    const { path } = req.body;

    /* let files = Object.values(req.files).flat(); */
    let files = flattenArray(Object.values(req.files))
    let images = [];
    console.log('FILES-->', files, 'BODY-->', req.body)

    for (const file of files) {
      const img = await uploadToCloudinaryHandler(file, path);
      images.push(img);
      removeTmp(file.tempFilePath);
    }
    console.log('IMAGES--->', images)

    return res.json(images);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  let image_id = req.body.public_id;

  try {
    await deleteFromCloudinaryHandler(image_id)

    return res.json({ success: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: e.message });
  }
});

const deleteFromCloudinaryHandler = async (image_id) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.destroy(image_id, (err, res) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      console.log('DESTROYEDCLOUDINARY--->', res)
      resolve(res)
    });
  })
}

const uploadToCloudinaryHandler = async (file, path) => {
  return new Promise((resolve) => {
    // Upload to cloudinary
    cloudinary.v2.uploader.upload( 
      file.tempFilePath, { folder: path, }, (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          console.log(err);
          return res.status(400).json({ message: "Uploading image to cloudinary failed." });
        }
        console.log('CLOUDINARYRESPONSE--->', res)
        resolve({
          url: res.secure_url,
          public_url: res.public_id,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default handler;
