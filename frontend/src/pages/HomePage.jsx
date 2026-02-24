import { useChatStore } from "../store/useChatStore";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#1A1333] overflow-hidden pt-20">

      {/* Purple Glow */}
      <div className="absolute w-[700px] h-[700px] bg-[#7C5CFF] opacity-30 blur-[180px] rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[600px] h-[600px] bg-[#FF4FD8] opacity-30 blur-[160px] rounded-full -bottom-40 -right-40"></div>

      {/* Main Container */}
      <div
        className="
        relative
        w-full
        max-w-[1400px]
        h-[88vh]
        flex
        rounded-[40px]
        overflow-hidden
        border border-white/20
        bg-[#2A1E5C]/40
        backdrop-blur-2xl
        shadow-[0_50px_120px_rgba(0,0,0,0.6)]
      "
      >

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-[320px] bg-white/10 backdrop-blur-xl border-r border-white/20 p-6">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="absolute inset-0 z-50 bg-black/50 md:hidden">
            <div className="w-[300px] h-full bg-white/10 backdrop-blur-2xl border-r border-white/20 p-6">
              <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-8">

          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white shadow-md"
            >
              ☰ Messages
            </button>
          </div>

          <div className="flex-1 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 p-6 overflow-hidden shadow-inner">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>

        </div>

      </div>
    </div>
  );
};

export default HomePage;