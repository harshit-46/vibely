const conversationModel = require("./../models/conversation");

exports.getOrCreateConversation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { receiverId } = req.body;

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        if (receiverId === userId) {
            return res.status(400).json({ message: "Cannot message yourself" });
        }

        let conversation = await conversationModel.findOne({
            participants: { $all: [userId, receiverId] },
        }).populate("participants", "username name");

        if (conversation) {
            return res.status(200).json({ conversation });
        }

        conversation = await conversationModel.create({
            participants: [userId, receiverId],
            lastMessageText: "",
            lastMessageAt: new Date(),
        });

        conversation = await conversationModel.populate(
            "participants",
            "username name"
        );

        return res.status(201).json({ conversation });
    } catch (error) {
        console.error("Conversation error:", error);
        res.status(500).json({ message: "Server error" });
    }
};