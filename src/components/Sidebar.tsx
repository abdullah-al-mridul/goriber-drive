import React from 'react';
import { 
  Home, 
  Folder, 
  Star, 
  Trash2, 
  Clock, 
  Users, 
  Upload,
  HardDrive,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true, count: null },
    { icon: Folder, label: 'My Files', active: false, count: 48 },
    { icon: Users, label: 'Shared', active: false, count: 12 },
    { icon: Star, label: 'Starred', active: false, count: 5 },
    { icon: Clock, label: 'Recent', active: false, count: null },
    { icon: Trash2, label: 'Trash', active: false, count: 3 },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-700">
            <span className="text-white font-medium">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-6">
            {/* Upload Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded font-medium transition-colors flex items-center justify-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center justify-between px-3 py-2 rounded transition-colors ${
                    item.active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.active 
                        ? 'bg-blue-700 text-blue-100' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Storage Info */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <HardDrive className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="text-white font-medium text-sm">Storage</h3>
                  <p className="text-gray-400 text-xs">847 GB of 1.2 TB used</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Available</span>
                <span className="text-white">353 GB</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;