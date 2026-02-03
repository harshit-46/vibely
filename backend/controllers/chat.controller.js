const Conversation = require("../models/conversation");
const Message = require("../models/message");

exports.getUserChats = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: userId,
        })
            .populate("participants", "username name avatar")
            .sort({ lastMessageAt: -1 });

        const chats = await Promise.all(
            conversations.map(async (conversation) => {
                const otherUser = conversation.participants.find(
                    (p) => p._id.toString() !== userId
                );

                let lastMessage = null;
                if (conversation.lastMessage) {
                    lastMessage = await Message.findById(conversation.lastMessage);
                }

                const unreadCount = await Message.countDocuments({
                    conversationId: conversation._id,
                    senderId: { $ne: userId },
                    seenBy: { $ne: userId },
                });

                return {
                    _id: conversation._id,
                    user: otherUser,
                    lastMessage: lastMessage
                        ? {
                            content: lastMessage.content,
                            createdAt: lastMessage.createdAt,
                        }
                        : null,
                    unreadCount,
                };
            })
        );

        res.status(200).json({ chats });
    } catch (error) {
        console.error("Get chats error:", error);
        res.status(500).json({ message: "Failed to fetch chats" });
    }
};