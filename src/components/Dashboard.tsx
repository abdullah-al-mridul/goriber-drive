import React, { useState } from "react";
import Header from "./Header";
import FileGrid from "./FileGrid";
import Sidebar from "./Sidebar";
import useFileStore from "../store/files.store";
import FileUploadContainer from "./FileUploadContainer";
interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fileUploading } = useFileStore();

  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col from-[#16222E] to-[#161A1D]">
      <Header
        onLogout={onLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 min-lg:ml-64">
          <FileGrid searchQuery={searchQuery} />
        </main>
      </div>
      <FileUploadContainer fileUploading={fileUploading} />
    </div>
  );
};

export default Dashboard;
