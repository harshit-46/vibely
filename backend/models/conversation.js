const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
        ],

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
            default: null,
        },

        lastMessageText: {
            type: String,
            default: "",
        },

        lastMessageAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

conversationSchema.index({ participants: 1 }, { unique: false });

module.exports = mongoose.model("conversation", conversationSchema);