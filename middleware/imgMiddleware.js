import fs from "fs";
import { flattenArray } from "../utils/arraysUtils";

export const imgMiddleware = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files were choosen." });
    }

    // let files = Object.values(req.files).flat();
    let files = flattenArray(Object.values(req.files))

    for (const file of files) {
      //---------------
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);

        return res.status(400).json({
          message: "File format is incorrect, only JPEG/PNG/WEBP are allowed.",
        });
      }
      //---------------
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);

        return res.status(400).json({
          message: "File size is too large maximum 10 mb allowed.",
        });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
