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
  Star,
  Share,
  Eye,
} from "lucide-react";
import { type FileType } from "../types";

interface FileCardProps {
  file: FileType;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "image":
      return Image;
    case "video":
      return Video;
    case "audio":
      return Music;
    case "document":
      return FileText;
    case "archive":
      return Archive;
    default:
      return File;
  }
};

const getFileColor = (type: string) => {
  switch (type) {
    case "image":
      return "text-green-400";
    case "video":
      return "text-red-400";
    case "audio":
      return "text-purple-400";
    case "document":
      return "text-blue-400";
    case "archive":
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = getFileIcon(file.type);
  const iconColor = getFileColor(file.type);

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
          {file.starred && (
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
          )}
        </div>

        <div
          className={`transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="p-1 rounded hover:bg-gray-700/50 transition-colors">
            <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </button>
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
        <span className="text-gray-500 text-xs">{file.modified}</span>

        <div
          className={`flex items-center space-x-1 transition-all duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="p-1 rounded hover:bg-gray-700/50 transition-colors">
            <Eye className="w-3 h-3 text-gray-400 " />
          </button>
          <button className="p-1 rounded hover:bg-gray-700/50 transition-colors">
            <Download className="w-3 h-3 text-gray-400 " />
          </button>
          <button className="p-1 rounded hover:bg-gray-700/50 transition-colors">
            <Share className="w-3 h-3 text-gray-400 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
