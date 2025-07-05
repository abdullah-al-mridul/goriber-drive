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

interface FileUploadingItem {
  name: string;
  size: string;
  progress: number;
}

interface FileStore {
  loading: boolean;
  files: FileInterface[] | null;
  fileUploading: FileUploadingItem[];
  getFiles: (page: number) => Promise<void>;
  fileUpload: (file: any) => Promise<void>;
}

const useFileStore = create<FileStore>((set) => ({
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
      fileUploading: [...state.fileUploading, { name, size, progress: 0 }],
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/file-api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );

          set((state) => ({
            fileUploading: state.fileUploading.map((f) =>
              f.name === name ? { ...f, progress: percent } : f
            ),
          }));

          console.log(`${name}: ${percent}%`);
        },
      });

      console.log("Upload success:", file.name);
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    }
  },
}));

export default useFileStore;
