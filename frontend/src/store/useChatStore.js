import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isTyping: false,

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

      // 🔹 Stop typing after sending
      socket?.emit("stopTyping", selectedUser._id);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // 🔹 New Message Listener
    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });

    // 🔹 Typing Listener
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

  setSelectedUser: (selectedUser) =>
    set({ selectedUser, isTyping: false }),
}));