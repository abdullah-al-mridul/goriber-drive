import React from "react";
import { Search, LogOut, Menu, X } from "lucide-react";
import Logo from "../assets/img/logo.png";
interface HeaderProps {
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  onLogout,
  searchQuery,
  setSearchQuery,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <header className="border-b border-white/10 sticky top-0 z-50">
      <div className="px-3 sm:px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Logo"
                className=" h-8 scale-150 mr-3 brightness-200"
              />
              <span className="text-white font-medium  hidden sm:block text-xl">
                Goriber Drive
              </span>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full pl-10 pr-4 py-2 bg-[rgba(100,116,139)]/10 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none  transition-colors text-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* View Mode Toggle - Hidden on mobile */}
            {/* <div className="hidden sm:flex items-center bg-gray-700 rounded p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div> */}

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-300" />
              </div> */}
              <button
                onClick={onLogout}
                className="hidden sm:flex items-center space-x-1 text-gray-400  transition-colors p-2 hover:bg-[rgba(100,116,139)]/10 rounded"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
              <button
                onClick={onLogout}
                className="sm:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
