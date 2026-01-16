/*

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
                <div className="w-full md:w-96 border-r border-zinc-800 flex flex-col">
                    <ChatList
                        selectedChat={selectedChat}
                        onSelectedChat={setSelectedChat}
                    />
                </div>

                <div className="hidden md:flex flex-1">
                    <ChatWindow selectedChat={selectedChat} />
                </div>
            </div>

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

*/


import { useParams } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/navbar";

function ChatPage() {
    const { conversationId } = useParams();

    return (
        <div className="min-h-screen bg-zinc-950/95">
            <Navbar currentPage="chat" />

            <div className="flex h-[calc(100vh-64px)]">
                {/* Chat List */}
                <div className="w-full md:w-96 border-r border-zinc-800 flex flex-col">
                    <ChatList />
                </div>

                {/* Desktop Chat Window */}
                <div className="hidden md:flex flex-1">
                    {conversationId ? (
                        <ChatWindow conversationId={conversationId} />
                    ) : (
                        <div className="flex flex-1 items-center justify-center text-zinc-500">
                            Select a chat to start messaging
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Chat Window */}
            {conversationId && (
                <div className="md:hidden fixed inset-0 z-50 bg-zinc-950">
                    <ChatWindow conversationId={conversationId} />
                </div>
            )}
        </div>
    );
}

export default ChatPage;