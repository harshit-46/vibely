const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const cookie = require("cookie");

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.use((socket, next) => {
        try {
            const cookieHeader = socket.request.headers.cookie;

            if (!cookieHeader) {
                return next(new Error("No cookies sent"));
            }

            const cookies = cookie.parse(cookieHeader);
            const token = cookies.token;

            if (!token) {
                return next(new Error("No auth token"));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;

            next();
        } catch (err) {
            console.error("Socket auth error:", err.message);
            next(new Error("Authentication failed"));
        }
    });

    io.on("connection", (socket) => {
        console.log("🟢 Socket connected:", socket.userId);

        socket.on("joinConversation", (conversationId) => {
            socket.join(conversationId);
        });


        socket.on("sendMessage", async ({ conversationId, content }) => {
            try {
                if (!content?.trim()) return;

                const message = await Message.create({
                    conversationId,
                    senderId: socket.userId,
                    content,
                    seenBy: [socket.userId],
                });

                await Conversation.findByIdAndUpdate(conversationId, {
                    lastMessage: message._id,
                    lastMessageText: content,
                    lastMessageAt: message.createdAt,
                });

                io.to(conversationId).emit("receiveMessage", {
                    _id: message._id,
                    conversationId,
                    senderId: socket.userId,
                    content: message.content,
                    createdAt: message.createdAt,
                });
            } catch (err) {
                console.error("Send message error:", err);
            }
        });

        socket.on("typing", ({ conversationId }) => {
            socket.to(conversationId).emit("userTyping");
        });

        socket.on("stopTyping", ({ conversationId }) => {
            socket.to(conversationId).emit("userStopTyping");
        });

        socket.on("disconnect", () => {
            console.log("🔴 Socket disconnected:", socket.userId);
        });
    });
};

module.exports = { initSocket };