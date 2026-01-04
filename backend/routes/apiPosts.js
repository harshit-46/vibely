const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const upload = require("../middlewares/upload");
const isLoggedIn = require("../middlewares/isLoggedin");

router.post(
    "/",
    isLoggedIn,
    upload.single("media"),
    async (req, res) => {
        try {
            const postData = {
                content: req.body.content,
                userId: req.user._id,
            };

            if (req.file) {
                postData.imageUrl = req.file.path;
                postData.imagePublicId = req.file.filename;
            }

            const post = await postModel.create(postData);

            res.status(201).json({
                success: true,
                post,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to create post" });
        }
    }
);

module.exports = router;