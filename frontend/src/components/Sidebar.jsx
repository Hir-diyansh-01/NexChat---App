import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full flex flex-col">

      {/* ===== Header ===== */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="size-5 text-white/80" />
          <h2 className="text-lg font-semibold text-white">
            Messages
          </h2>

          {closeSidebar && (
            <button
              onClick={closeSidebar}
              className="ml-auto md:hidden text-white/60"
            >
              ✕
            </button>
          )}
        </div>

        {/* ===== Search Bar (Dribbble Style) ===== */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/60" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-9 pr-4 py-2
              rounded-xl
              bg-white/20
              backdrop-blur-md
              text-white
              placeholder-white/60
              text-sm
              outline-none
              focus:ring-2 focus:ring-white/40
            "
          />
        </div>
      </div>

      {/* ===== Users List ===== */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                closeSidebar && closeSidebar();
              }}
              className={`
                w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300
                ${
                  isSelected
                    ? "bg-white/30 shadow-lg"
                    : "bg-white/10 hover:bg-white/20"
                }
              `}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-11 object-cover rounded-xl"
                />

                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-[#7C5CFF] ring-2 ring-[#5B3DF5]" />
                )}
              </div>

              {/* User Info */}
              <div className="text-left min-w-0">
                <div className="font-medium text-white truncate text-sm">
                  {user.fullName}
                </div>
                <div className="text-xs text-white/60">
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>

            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-white/50 py-6 text-sm">
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;