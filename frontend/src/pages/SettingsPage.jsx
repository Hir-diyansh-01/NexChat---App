import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Check } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "All good! Working on UI upgrades 🚀", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Appearance Settings</h1>
          <p className="text-slate-400 mt-2">
            Customize how your chat interface looks and feels.
          </p>
        </div>

        {/* Theme Selection Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">

          <h2 className="text-xl font-semibold mb-6">Choose Theme</h2>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`relative group rounded-xl p-2 transition-all duration-200 
                  ${theme === t 
                    ? "ring-2 ring-cyan-400 scale-105" 
                    : "hover:scale-105 hover:ring-1 hover:ring-slate-600"}
                `}
              >
                <div
                  className="h-10 w-full rounded-lg overflow-hidden"
                  data-theme={t}
                >
                  <div className="grid grid-cols-4 gap-px p-1 h-full">
                    <div className="bg-primary rounded"></div>
                    <div className="bg-secondary rounded"></div>
                    <div className="bg-accent rounded"></div>
                    <div className="bg-neutral rounded"></div>
                  </div>
                </div>

                {theme === t && (
                  <Check
                    size={16}
                    className="absolute top-1 right-1 text-cyan-400"
                  />
                )}

                <p className="text-xs mt-2 text-center capitalize text-slate-300">
                  {t}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">

          <h2 className="text-xl font-semibold mb-6">Live Preview</h2>

          <div className="max-w-xl mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-lg">

            {/* Chat Header */}
            <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center font-semibold">
                J
              </div>
              <div>
                <h3 className="text-sm font-medium">John Doe</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 bg-slate-900 min-h-[220px]">
              {PREVIEW_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md
                      ${msg.isSent
                        ? "bg-cyan-500 text-slate-900"
                        : "bg-slate-800 text-white"}
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700 bg-slate-800 flex gap-2">
              <input
                type="text"
                value="This is a preview message"
                readOnly
                className="flex-1 px-4 py-2 rounded-xl bg-slate-900 text-white outline-none"
              />
              <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 rounded-xl flex items-center justify-center transition">
                <Send size={18} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;