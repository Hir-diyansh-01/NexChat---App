import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [lightMode, setLightMode] = useState(false);

  // Toggle full white screen
  useEffect(() => {
    if (lightMode) {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [lightMode]);

  return (
    <header className="fixed top-0 w-full z-50 px-6">
      <div className="glass max-w-7xl mx-auto px-6 py-4 flex items-center justify-between shadow-2xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wide">
            NexChat
          </h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* 🌗 Full White Toggle */}
          <button
            onClick={() => setLightMode(!lightMode)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            {lightMode ? (
              <Moon className="w-5 h-5 text-purple-500" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          <Link to="/settings" className="flex items-center gap-2 hover:opacity-100 opacity-80 transition">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-100 opacity-80 transition">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;