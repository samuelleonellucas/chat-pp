import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  const createConversation = () => {
    const newConv = {
      id: Date.now(),
      title: "Nova conversa",
      messages: [],
    };
    setConversations([newConv, ...conversations]);
    setActiveConversation(newConv.id);
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (activeConversation === id) setActiveConversation(null);
  };

  const sendMessage = (text) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: Date.now(), role: "user", content: text },
                {
                  id: Date.now() + 1,
                  role: "assistant",
                  content: "❌ Erro: falha ao processar mensagem",
                },
              ],
            }
          : c
      )
    );
  };

  const activeChat = conversations.find((c) => c.id === activeConversation);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        createConversation={createConversation}
        deleteConversation={deleteConversation}
      />
      <ChatWindow
        conversation={activeChat}
        sendMessage={sendMessage}
      />
    </div>
  );
}
