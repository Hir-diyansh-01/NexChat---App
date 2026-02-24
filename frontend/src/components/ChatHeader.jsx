import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center justify-between px-6 py-4">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt="user"
            className="w-12 h-12 rounded-2xl object-cover border border-white/20"
          />

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 ring-2 ring-[#312E81]" />
          )}
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-base font-semibold text-white">
            {selectedUser.fullName}
          </h2>

          <p className="text-xs text-white/60">
            {isOnline ? "Online now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="bg-white/10 backdrop-blur-md p-2 rounded-xl hover:bg-white/20 transition"
      >
        <X size={18} className="text-white/70" />
      </button>
    </div>
  );
};

export default ChatHeader;