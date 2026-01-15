import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/navbar";

function ChatPage() {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="min-h-screen bg-zinc-950/95">
            <Navbar currentPage="chat" />

            <div className="flex h-[calc(100vh-64px)]">
                {/* Chat List */}
                <div className="w-full md:w-96 border-r border-zinc-800 flex flex-col">
                    <ChatList
                        selectedChat={selectedChat}
                        onSelectChat={setSelectedChat}
                    />
                </div>

                {/* Desktop Chat Window */}
                <div className="hidden md:flex flex-1">
                    <ChatWindow selectedChat={selectedChat} />
                </div>
            </div>

            {/* Mobile Chat Window */}
            {selectedChat && (
                <div className="md:hidden fixed inset-0 z-50 bg-zinc-950">
                    <ChatWindow
                        selectedChat={selectedChat}
                        onBack={() => setSelectedChat(null)}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatPage;