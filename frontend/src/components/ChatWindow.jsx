import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send, MoreVertical, Smile } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { Theme } from 'emoji-picker-react';
import { EmojiStyle } from 'emoji-picker-react';
import { useSocket } from "../context/SocketContext";

function ChatWindow() {
    const socket = useSocket();
    const { conversationId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState(null);

    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    const emojiPickerRef = useRef(null);
    const messagesEndRef = useRef(null);

    /* ================= FETCH CONVERSATION ================= */
    useEffect(() => {
        if (!conversationId) return;

        const fetchConversation = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/conversations/${conversationId}`,
                    { credentials: "include" }
                );
                const data = await res.json();
                setConversation(data.conversation);
            } catch (err) {
                console.error("Failed to fetch conversation", err);
            }
        };

        fetchConversation();
    }, [conversationId]);

    /* ================= FETCH MESSAGES ================= */
    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:3000/api/messages/${conversationId}`,
                    { credentials: "include" }
                );
                const data = await res.json();
                setMessages(data.messages || []);
            } catch (err) {
                console.error("Failed to fetch messages", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [conversationId]);

    /* ================= SOCKET JOIN ================= */
    useEffect(() => {
        if (!socket || !socket.connected || !conversationId) return;

        socket.emit("joinConversation", conversationId);

        return () => {
            socket.emit("leaveConversation", conversationId);
        };
    }, [socket, conversationId]);


    /* ================= RECEIVE MESSAGE ================= */
    useEffect(() => {
        if (!socket) return;

        const handleReceive = (message) => {
            if (message.conversationId !== conversationId) return;
            setMessages((prev) => [...prev, message]);
        };

        socket.on("receiveMessage", handleReceive);

        return () => socket.off("receiveMessage", handleReceive);
    }, [socket, conversationId]);

    /* ================= SEND MESSAGE ================= */
    const handleSendMessage = () => {
        if (!messageText.trim() || !socket?.connected) return;

        socket.emit("sendMessage", {
            conversationId,
            content: messageText,
        });

        socket.emit("stopTyping", { conversationId });

        setMessageText("");
    };

    /* ================= AUTO SCROLL ================= */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatTime = (timestamp) =>
        new Date(timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    const otherUser = conversation?.participants?.find(
        (p) => p._id !== user?._id
    );

    if (!conversationId) return null;


    useEffect(() => {
        if (!socket) return;

        socket.on("userTyping", () => {
            setIsTyping(true);
        });

        socket.on("userStopTyping", () => {
            setIsTyping(false);
        });

        return () => {
            socket.off("userTyping");
            socket.off("userStopTyping");
        };
    }, [socket]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target)
            ) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmojiPicker]);


    const handleEmojiClick = (emojiData) => {
        setMessageText((prev) => prev + emojiData.emoji);
    };


    const isEmojiOnly = (text) => {
        if (!text) return false;

        // Remove spaces
        const trimmed = text.trim();

        // Regex to match only emojis (Unicode safe)
        return /^[\p{Emoji}\u200d\s]+$/u.test(trimmed);
    };

    const handleTyping = (e) => {
        setMessageText(e.target.value);

        if (!socket?.connected || showEmojiPicker) return;

        socket.emit("typing", { conversationId });

        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stopTyping", { conversationId });
        }, 800);
    };




    /* ================= UI ================= */
    return (
        <div className="flex-1 flex flex-col bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
                    if (otherUser?.username) {
                        navigate(`/u/${otherUser.username}`);
                    }
                }}
                >
                    <button
                        onClick={() => navigate("/chat")}
                        className="md:hidden p-2 hover:bg-zinc-800 rounded-full"
                    >
                        <ArrowLeft size={20} className="text-zinc-400" />
                    </button>

                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        {(otherUser?.name || "U").charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h3 className="font-semibold text-white text-sm">
                            {otherUser?.name || "User"}
                        </h3>
                        <p className="text-xs text-zinc-400">{otherUser?.username || "loading"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <MoreVertical size={20} className="text-zinc-400" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <p className="text-zinc-500 text-center">Loading messages...</p>
                ) : messages.length === 0 ? (
                    <p className="text-zinc-500 text-center">
                        No messages yet. Start the conversation!
                    </p>
                ) : (
                    messages.map((msg) => {
                        const isOwn =
                            msg.senderId === user?._id ||
                            msg.senderId?._id === user?._id;

                        const emojiOnly = isEmojiOnly(msg.content);

                        return (
                            <div
                                key={msg._id}
                                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                            >

                                <div
                                    className={`max-w-xs lg:max-w-md rounded-2xl ${emojiOnly
                                        ? "bg-transparent px-2 py-1"
                                        : isOwn
                                            ? "bg-blue-600 text-white px-4 py-2"
                                            : "bg-zinc-800 text-zinc-200 px-4 py-2"
                                        }`}
                                >
                                    <p
                                        className={`${emojiOnly
                                            ? "text-4xl leading-none"
                                            : "text-sm wrap-break-word"
                                            }`}
                                    >
                                        {msg.content}
                                    </p>

                                    {!emojiOnly && (
                                        <span className="text-xs block mt-1 opacity-70">
                                            {formatTime(msg.createdAt)}
                                        </span>
                                    )}
                                </div>

                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {isTyping && (
                <p className="text-xs text-zinc-400 px-4 mb-1">
                    {otherUser?.username || "user"} is typing…
                </p>
            )}

            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-zinc-800 flex gap-2"
            >


                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker((p) => !p)}
                        className="text-xl"
                    >
                        <Smile className="text-white" />
                    </button>

                    {showEmojiPicker && (
                        <div ref={emojiPickerRef} className="absolute bottom-12 left-0 z-50 mb-4 -ml-16">
                            <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} emojiStyle={EmojiStyle.FACEBOOK} searchDisabled={true}
                                previewConfig={{
                                    showPreview: false,
                                }} height={300} width={350} lazyLoadEmojis={true}
                            />
                        </div>
                    )}
                </div>

                <textarea
                    value={messageText}
                    onChange={handleTyping}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-200 resize-none"
                />

                <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 px-4 py-2 rounded-lg"
                >
                    <Send size={18} className="text-white" />
                </button>
            </form>
        </div>
    );
}

export default ChatWindow;