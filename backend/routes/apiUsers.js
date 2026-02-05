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

router.put("/updateInfo", isLoggedIn, async (req, res) => {
    try {
        const { name, username, bio } = req.body;

        const updates = {};

        if (name !== undefined) updates.name = name.trim();
        if (bio !== undefined) updates.bio = bio.trim();

        if (username !== undefined) {
            const normalizedUsername = username.trim().toLowerCase();

            // Check if username is taken by another user
            const existingUser = await userModel.findOne({
                username: normalizedUsername,
                _id: { $ne: req.user._id }
            });

            if (existingUser) {
                return res.status(400).json({ message: "Username already taken" });
            }

            updates.username = normalizedUsername;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "Nothing to update" });
        }

        const updatedUser = await userModel
            .findByIdAndUpdate(req.user._id, updates, {
                new: true,
                runValidators: true
            })
            .select("-password");

        res.status(200).json({ user: updatedUser });

    } catch (err) {
        console.error("Error updating user info:", err);
        res.status(500).json({ message: "Failed to update user info" });
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