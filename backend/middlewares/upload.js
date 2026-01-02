const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "posts",
        transformation: [
            {
                width: 600,
                height: 600,
                crop: "fill",
                gravity: "auto"
            }
        ],
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;