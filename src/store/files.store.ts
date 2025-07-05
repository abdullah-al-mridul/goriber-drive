import { create } from "zustand";
import api from "../api/axios";

interface File {}

interface FileStore {}

const useFileStore = create<FileStore>((set, get) => ({}));

export default useFileStore;
