const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const isLoggedIn = require("../middlewares/isLoggedin");

router.get("/u/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const user = await userModel.findOne({ username }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Failed to fetch user"
        });
    }
});

router.put("/theme", isLoggedIn, async (req, res) => {
    const { theme } = req.body;

    if (!["light", "dark"].includes(theme)) {
        return res.status(400).json({ message: "Invalid theme" });
    }

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { theme },
        { new: true }
    );

    res.json({ theme: user.theme });
});

module.exports = router;