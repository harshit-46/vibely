const Message = require("../models/message");
const Conversation = require("../models/conversation");

exports.getConversationMessages = async (req, res) => {
    try {
        const userId = req.user.id;
        const { conversationId } = req.params;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId,
        });

        if (!conversation) {
            return res.status(403).json({ message: "Access denied" });
        }

        const messages = await Message.find({
            conversationId,
        })
            .sort({ createdAt: 1 })
            .lean();

        res.status(200).json({ messages });
    } catch (error) {
        console.error("Fetch messages error:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
};