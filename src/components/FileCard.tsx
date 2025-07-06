import React, { useState } from "react";
import {
  FileText,
  Image,
  Video,
  Music,
  Archive,
  File,
  MoreVertical,
  Download,
  Eye,
  Trash,
} from "lucide-react";
import { type FileType } from "../types";
import useFileStore from "../store/files.store";
interface FileCardProps {
  file: FileType;
}

const getFileIcon = (ext: string) => {
  const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExts = ["mp4", "mkv", "avi", "mov", "webm", "flv"];
  const audioExts = ["mp3", "wav", "aac", "ogg", "flac"];
  const documentExts = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];
  const archiveExts = ["zip", "rar", "7z", "tar", "gz"];

  ext = ext.toLowerCase();

  if (imageExts.includes(ext)) return Image;
  if (videoExts.includes(ext)) return Video;
  if (audioExts.includes(ext)) return Music;
  if (documentExts.includes(ext)) return FileText;
  if (archiveExts.includes(ext)) return Archive;

  return File;
};

const getFileColor = (ext: string): string => {
  const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExts = ["mp4", "mkv", "avi", "mov", "webm", "flv"];
  const audioExts = ["mp3", "wav", "aac", "ogg", "flac"];
  const documentExts = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];
  const archiveExts = ["zip", "rar", "7z", "tar", "gz"];

  ext = ext.toLowerCase();

  if (imageExts.includes(ext)) return "text-green-400";
  if (videoExts.includes(ext)) return "text-red-400";
  if (audioExts.includes(ext)) return "text-purple-400";
  if (documentExts.includes(ext)) return "text-blue-400";
  if (archiveExts.includes(ext)) return "text-yellow-400";

  return "text-gray-400";
};

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = getFileIcon(file.extension);
  const iconColor = getFileColor(file.extension);
  const { fileDelete } = useFileStore();
  return (
    <div
      className="bg-[rgba(100,116,139)]/10 border border-white/10 rounded-lg p-3 sm:p-4 hover:bg-gray-750 hover:border-white/15 transition-all duration-200 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor}`} />
        </div>

        <div
          className={`transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* <button className="p-1 rounded hover:bg-gray-700/50 transition-colors">
            <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </button> */}
        </div>
      </div>

      {/* File Info */}
      <div className="mb-3">
        <h3
          className="text-white font-medium text-xs sm:text-sm mb-1 truncate"
          title={file.name}
        >
          {file.name}
        </h3>
        <p className="text-gray-400 text-xs">{file.size}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-xs">{file.createdAt}</span>

        <div
          className={`flex items-center space-x-1 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          } max-sm:opacity-100`}
        >
          <button className="p-1 rounded hover:bg-gray-700/50 transition-colors">
            <Eye className="w-3 h-3 text-gray-400 " />
          </button>
          <button
            onClick={() =>
              (window.location.href = `${
                import.meta.env.VITE_API_URL
              }/file-api/download?filename=${encodeURIComponent(file.name)}`)
            }
            className="p-1 rounded hover:bg-gray-700/50 transition-colors"
          >
            <Download className="w-3 h-3 text-gray-400 " />
          </button>
          <button
            onClick={() => fileDelete(file.name)}
            className="p-1 rounded hover:bg-gray-700/50 transition-colors"
          >
            <Trash className="w-3 h-3 text-gray-400 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
