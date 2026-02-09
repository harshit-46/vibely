const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },

    password: {
        type: String,
        default: null
    },

    providers: {
        type: [String],
        enum: ["local", "google"],
        default: ["local"]
    },

    googleId: {
        type: String,
        default: null
    },

    profileImage: {
        type: String,
        default: ""
    },
    profileImagePublicId: {
        type: String,
        default: ""
    },
    followersCount: {
        type: Number,
        default: 0
    },
    followingCount: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: ""
    },
    postCount: {
        type: Number,
        default: 0
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,

    avatar: {
        type: String,
        default: ""
    },
    theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", userSchema);