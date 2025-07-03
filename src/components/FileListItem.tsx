import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';
import { FileType } from '../types';

interface FileListItemProps {
  file: FileType;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'image': return Image;
    case 'video': return Video;
    case 'audio': return Music;
    case 'document': return FileText;
    case 'archive': return Archive;
    default: return File;
  }
};

const getFileColor = (type: string) => {
  switch (type) {
    case 'image': return 'text-green-400';
    case 'video': return 'text-red-400';
    case 'audio': return 'text-purple-400';
    case 'document': return 'text-blue-400';
    case 'archive': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
};

const FileListItem: React.FC<FileListItemProps> = ({ file }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = getFileIcon(file.type);
  const iconColor = getFileColor(file.type);

  return (
    <div 
      className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-750 hover:border-gray-600 transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} flex-shrink-0`} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-white font-medium text-sm truncate" title={file.name}>
                {file.name}
              </h3>
              {file.starred && (
                <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />
              )}
            </div>
            <p className="text-gray-400 text-xs">{file.size} • {file.modified}</p>
          </div>
        </div>

        <div className={`flex items-center space-x-1 transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="p-2 rounded hover:bg-gray-700 transition-colors">
            <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 transition-colors">
            <Share className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileListItem;