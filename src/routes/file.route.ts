import multer, { Multer, diskStorage } from "multer"
import generateString from "../utils/generateString";
import { extname } from "path";
const { FILES_PATH } = process.env;

const upload: Multer = multer({
  storage: diskStorage({
    destination: FILES_PATH,
    filename: (req, file, cb) => {
      const { filename } = file;
      cb(null, `${generateString()}${extname(filename)}`);
    }
  })
});