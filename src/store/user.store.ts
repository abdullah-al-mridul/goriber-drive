import { create } from "zustand";
import api from "../api/axios";
import type { Dispatch, SetStateAction } from "react";
interface User {
  user: any;
  name: string | null;
  email: string;
  avatar: string | null;
}

interface UserStore {
  user: User | null;
  getUser: () => void;
  email: string | null;
  loading: boolean;
  login: (
    pin: string,
    email: string | null,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string | null>>
  ) => void;
  logout: () => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  loading: true,
  email: null,
  getUser: async () => {
    try {
      const userInfo: any = await api.get("/user-api/user");
      console.log(userInfo);
      set({ user: userInfo });
      set({ loading: false });
    } catch (error: object | any) {
      console.error("Failed to fetch user data:", error);
      set({ email: error.response?.data.email });
      set({ loading: false });
    }
  },
  login: async (pin: string, email: string | null, setLoading, setError) => {
    if (!email) {
      console.error("Email is required for login.");
      return;
    }
    try {
      setLoading(true);
      const userInfo: any = await api.post("/user-api/login", {
        email,
        password: pin,
      });
      console.log(userInfo);
      // set({ email: userInfo.user.user.email });
      set({ user: userInfo });
      setLoading(false);
    } catch (error: object | any) {
      console.error("Failed to fetch user data:", error);
      setLoading(false);
      setError(error.response?.data.message);
    }
  },
  logout: async () => {
    try {
      // console.log(get().user?.user.email);
      // set({ email: get().user?.user?.email });
      const response: any = await api.get("/user-api/logout");
      set({ user: null });
      get().getUser();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useUserStore;
