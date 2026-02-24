import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  unreadMessages: {}, // 🔥 { userId: count }
  isUsersLoading: false,
  isMessagesLoading: false,
  isTyping: false,

  // ================= USERS =================
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ================= MESSAGES =================
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const socket = useAuthStore.getState().socket;

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });

      // Stop typing after sending
      socket?.emit("stopTyping", selectedUser._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  // ================= UNREAD LOGIC =================
  setUnread: (userId) =>
    set((state) => ({
      unreadMessages: {
        ...state.unreadMessages,
        [userId]: (state.unreadMessages[userId] || 0) + 1,
      },
    })),

  clearUnread: (userId) =>
    set((state) => ({
      unreadMessages: {
        ...state.unreadMessages,
        [userId]: 0,
      },
    })),

  // ================= SOCKET SUBSCRIBE =================
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, setUnread } = get();

      const isMessageFromSelectedUser =
        selectedUser?._id === newMessage.senderId;

      if (isMessageFromSelectedUser) {
        set({
          messages: [...get().messages, newMessage],
        });
      } else {
        // 🔥 increase unread if chat not open
        setUnread(newMessage.senderId);
      }
    });

    socket.on("userTyping", () => {
      set({ isTyping: true });
    });

    socket.on("userStopTyping", () => {
      set({ isTyping: false });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.off("userTyping");
    socket.off("userStopTyping");
  },

  // ================= SELECT USER =================
  setSelectedUser: (selectedUser) =>
    set((state) => ({
      selectedUser,
      isTyping: false,
      unreadMessages: {
        ...state.unreadMessages,
        [selectedUser._id]: 0, // 🔥 clear unread when opening chat
      },
    })),
}));