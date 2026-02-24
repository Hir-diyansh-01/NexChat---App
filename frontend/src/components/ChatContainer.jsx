import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    isTyping,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">

      {/* Header */}
      <div className="px-6 pt-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
          <ChatHeader />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%]">

                {/* Message Bubble */}
                <div
                  className={`
                    px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-xl
                    ${
                      isSender
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-white/20 backdrop-blur-md text-white border border-white/20"
                    }
                  `}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[220px] rounded-2xl mb-3"
                    />
                  )}

                  {message.text && <p>{message.text}</p>}
                </div>

                {/* Timestamp */}
                <div
                  className={`text-xs mt-2 text-white/50 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-3xl border border-white/20">
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-3">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;