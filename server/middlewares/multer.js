import multer from "multer";
import { v4 as uuid } from "uuid";
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "../client/public/images");
    },
    filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split(".").pop();
        cb(null, `${id}.${extName}`);
    },
});
export const singleUpload = multer({ storage }).single("photo");
