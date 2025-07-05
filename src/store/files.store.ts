import { create } from "zustand";
import api from "../api/axios";
import type { AxiosProgressEvent } from "axios";
import { formatBytes } from "../utils/format";

interface FileInterface {
  name: string;
  size: string;
  extension: string;
  createdAt: string;
}

export interface FileUploadingItem {
  name: string;
  size: string;
  progress: number;
  isFinished: boolean;
}

interface FileStore {
  loading: boolean;
  files: FileInterface[] | null;
  fileUploading: FileUploadingItem[];
  getFiles: (page: number) => Promise<void>;
  fileUpload: (file: any) => Promise<void>;
}

const useFileStore = create<FileStore>((set, get) => ({
  loading: true,
  files: null,
  fileUploading: [],
  getFiles: async (page: number) => {
    try {
      const response: {
        data: FileInterface[];
      } = await api.get("/file-api/files", {
        params: { page },
      });
      console.log("Files fetched successfully:", response.data);
      set({ files: response.data });
      set({ loading: false });
    } catch (error: any) {
      console.error("Failed to fetch files:", error);
      set({ files: null });
      set({ loading: false });
    }
  },
  fileUpload: async (file: File) => {
    const name = file.name;
    const size = formatBytes(file.size);

    set((state) => ({
      fileUploading: [
        ...state.fileUploading,
        { name, size, progress: 0, isFinished: false },
      ],
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const upRes: any = await api.post("/file-api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );

          set((state) => ({
            fileUploading: state.fileUploading.map((f) =>
              f.name === name
                ? { ...f, progress: percent, isFinished: percent === 100 }
                : f
            ),
          }));

          // console.log(`${name}: ${percent}%`);
        },
      });
      const files = get().files;
      upRes.files.map((file: FileInterface) => {
        files?.unshift(file);
      });
      set({ files });
      console.log("Upload success:", file.name);
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    }
  },
}));

export default useFileStore;
