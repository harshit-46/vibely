/*

import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatList({ selectedChat, onSelectedChat }) {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/chats", {
                credentials: "include",
            });
            const data = await res.json();
            setChats(data.chats || []);
        } catch (err) {
            console.error("Failed to fetch chats", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredChats = chats.filter(
        (chat) =>
            chat.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 24) {
            return date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    };

    const handleChat = (chatId) => {
        navigate(`/chat/t/${chatId}`);
    };

    return (
        <div className="flex flex-col h-full bg-zinc-950/95">
            <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Messages</h2>
                    <button className="p-2 hover:bg-zinc-800 rounded-full transition">
                        <Plus size={20} className="text-zinc-400" />
                    </button>
                </div>

                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-600 transition"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-zinc-500 text-sm">Loading chats...</p>
                    </div>
                ) : filteredChats.length === 0 ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-zinc-500 text-sm">
                            {searchQuery ? "No chats found" : "No messages yet"}
                        </p>
                    </div>
                ) : (
                    filteredChats.map((chat) => (
                        <button
                            key={chat._id}
                            onClick={() => {
                                handleChat(chat._id);
                                onSelectedChat(chat);
                            }}
                            className={`w-full flex items-center gap-3 p-4 hover:bg-zinc-600 transition border-b border-zinc-800 ${selectedChat?._id === chat._id ? "bg-zinc-800" : ""
                                }`}
                        >
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                    {(chat.user?.name || chat.user?.username || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                                {chat.user?.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-sm text-white truncate">
                                        {chat.user?.name || "Unknown"}
                                    </h3>
                                    <span className="text-xs text-zinc-500 ml-2 shrink-0">
                                        {chat.lastMessage?.createdAt &&
                                            formatTime(chat.lastMessage.createdAt)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-zinc-400 truncate">
                                        {chat.lastMessage?.content || "No messages yet"}
                                    </p>
                                    {chat.unreadCount > 0 && (
                                        <span className="ml-2 shrink-0 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div >
    );
}

export default ChatList;


*/



import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ChatList() {
    const navigate = useNavigate();
    const { conversationId } = useParams();

    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/chats", {
                credentials: "include",
            });
            const data = await res.json();
            setChats(data.chats || []);
        } catch (err) {
            console.error("Failed to fetch chats", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChat = (chatId) => {
        navigate(`/chat/t/${chatId}`);
    };

    return (
        <div className="flex flex-col h-full bg-zinc-950/95">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Messages</h2>
                    <button className="p-2 hover:bg-zinc-800 rounded-full transition">
                        <Plus size={20} className="text-zinc-400" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-zinc-500 text-sm">Loading chats...</p>
                    </div>
                ) : (
                    chats.map((chat) => {
                        const isActive = conversationId === chat._id;

                        return (
                            <button
                                key={chat._id}
                                onClick={() => handleChat(chat._id)}
                                className={`w-full flex items-center gap-3 p-4 border-b border-zinc-800 transition
                                ${isActive ? "bg-zinc-800" : "hover:bg-zinc-700"}`}
                            >
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                    {(chat.user?.name || chat.user?.username || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-semibold text-white">
                                        {chat.user?.name || "Unknown"}
                                    </p>
                                    <p className="text-xs text-zinc-400 truncate">
                                        {chat.lastMessage?.content || "No messages yet"}
                                    </p>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default ChatList;
