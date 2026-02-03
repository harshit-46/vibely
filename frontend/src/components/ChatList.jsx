import React, { useState, useEffect } from "react";
import { Search, Plus, MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const formatRelativeTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

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
            if (!res.ok) throw new Error("Failed");
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

    const filteredChats = chats.filter((chat) =>
        (chat.user?.name || chat.user?.username || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-[#F9FAFB] dark:bg-neutral-950">
            <div className="p-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        Messages
                    </h2>
                    <button className="p-2 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 rounded-full transition">
                        <Plus size={20} className="text-neutral-600 dark:text-neutral-400" />
                    </button>
                </div>

                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`
                        w-full bg-white dark:bg-neutral-900 
                        border border-neutral-300 dark:border-neutral-800 
                        rounded-lg pl-10 pr-4 py-2.5 text-sm 
                        text-neutral-900 dark:text-neutral-200 
                        placeholder-neutral-500 dark:placeholder-neutral-500 
                        focus:outline-none focus:border-blue-400 dark:focus:border-blue-500/60
                        focus:ring-1 focus:ring-blue-300/30 dark:focus:ring-blue-500/20
                        transition-all duration-150
                    `}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                {loading ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                            Loading conversations...
                        </p>
                    </div>
                ) : filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6 text-neutral-500 dark:text-neutral-400">
                        <MessageCircle size={48} className="mb-5 opacity-40" />
                        <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            {searchQuery ? "No matching chats" : "No conversations yet"}
                        </p>
                        <p className="text-sm max-w-xs">
                            {searchQuery
                                ? "Try a different search term"
                                : "Start a conversation with someone"}
                        </p>
                    </div>
                ) : (
                    filteredChats.map((chat) => {
                        const isActive = conversationId === chat._id;
                        return (
                            <button
                                key={chat._id}
                                onClick={() => handleChat(chat._id)}
                                className={`
                                w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl mb-1 transition-all duration-150
                                ${isActive
                                        ? "bg-white dark:bg-neutral-900/80 border-l-4 border-l-blue-500 dark:border-l-blue-600/70 shadow-sm"
                                        : "hover:bg-white dark:hover:bg-neutral-900/60 active:bg-neutral-100 dark:active:bg-neutral-800/60"
                                    }
                                `}
                            >
                                <div
                                    className={`
                                        w-12 h-12 rounded-full 
                                        bg-linear-to-br from-blue-500 to-indigo-600 
                                        flex items-center justify-center text-white font-semibold shrink-0
                                    `}
                                >
                                    {chat.user?.avatar ?
                                        (
                                            <img src={chat.user.avatar}
                                                alt={chat.user.name}
                                                className="w-full h-full object-cover rounded-full" />
                                        ) :
                                        (
                                            <span>
                                                {(chat.user?.name || chat.user?.username || "U")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        )}
                                </div>

                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                            {chat.user?.name || chat.user?.username || "Unknown"}
                                        </p>
                                        {chat.lastMessage?.createdAt && (
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400 shrink-0 ml-2">
                                                {formatRelativeTime(chat.lastMessage.createdAt)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate mt-0.5">
                                        {chat.lastMessage?.content || "Start the conversation"}
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