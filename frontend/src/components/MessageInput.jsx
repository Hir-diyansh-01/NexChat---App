import { useState, useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, selectedUser } = useChatStore();
  const { socket } = useAuthStore();
  const typingTimeoutRef = useRef(null);

  const handleTyping = (value) => {
    setText(value);

    if (!socket || !selectedUser) return;

    socket.emit("typing", selectedUser._id);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", selectedUser._id);
    }, 1000);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await sendMessage({ text });
    setText("");
  };

  useEffect(() => {
    return () => {
      if (socket && selectedUser) {
        socket.emit("stopTyping", selectedUser._id);
      }
    };
  }, [socket, selectedUser]);

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-4"
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => handleTyping(e.target.value)}
        className="
          flex-1
          px-5 py-3
          rounded-2xl
          bg-white/20
          backdrop-blur-md
          border border-white/20
          text-white
          placeholder-white/60
          outline-none
          focus:ring-2 focus:ring-purple-400
          transition
        "
      />

      {/* Send Button */}
      <button
        type="submit"
        className="
          p-3
          rounded-2xl
          bg-gradient-to-r
          from-purple-500
          to-pink-500
          text-white
          shadow-lg
          hover:scale-105
          active:scale-95
          transition-all
          duration-200
        "
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;