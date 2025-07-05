import React, { useEffect } from "react";
import FileCard from "./FileCard";
import { Upload, Filter, SortAsc } from "lucide-react";
import useFileStore from "../store/files.store";
import Logo from "../assets/img/logo.png";
interface FileGridProps {
  searchQuery: string;
  viewMode: "grid" | "list";
}

const FileGrid: React.FC<FileGridProps> = ({ searchQuery }) => {
  const { getFiles, files: filesFetched, loading } = useFileStore();
  const filteredFiles = filesFetched?.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    getFiles(1);
  }, [getFiles]);
  useEffect(() => {
    console.log("file fetched top", filesFetched);
  }, [filesFetched]);
  if (loading) {
    return (
      <div className=" flex items-center justify-center h-full">
        <img src={Logo} alt="Logo" />
      </div>
    );
  }
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-medium text-white mb-1">
            My Files
          </h2>
          <p className="text-gray-400 text-sm">
            {filteredFiles?.length}{" "}
            {filteredFiles?.length === 1 ? "file" : "files"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-2">
          {/* Mobile View Toggle */}
          {/* <div className="sm:hidden flex items-center bg-gray-700 rounded p-1">
            <button
              // onClick={() => setCurrentViewMode("grid")}
              className={`p-1.5 rounded transition-colors bg-blue-600 text-white`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              // onClick={() => setCurrentViewMode("list")}
              className={`p-1.5 rounded transition-colors text-gray-400 hover:text-white`}
            >
              <List className="w-4 h-4" />
            </button>
          </div> */}

          {/* Filter & Sort */}
          <div className="flex items-center space-x-2">
            <button
              disabled
              className="flex items-center space-x-1 px-3 py-1.5 bg-[rgba(100,116,139)]/15  rounded text-gray-400  transition-colors text-sm disabled:opacity-70"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button
              disabled
              className="flex items-center space-x-1 px-3 py-1.5 bg-[rgba(100,116,139)]/15  rounded text-gray-400  transition-colors text-sm disabled:opacity-70"
            >
              <SortAsc className="w-4 h-4" />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>

          {/* Upload Button */}
          <button
            disabled
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500/10  rounded text-blue-500  transition-colors text-sm disabled:opacity-70"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[rgba(100,116,139)]/15  rounded-lg p-3 sm:p-4 border border-white/10">
          <div className="text-blue-400 text-xs sm:text-sm font-medium mb-1">
            Total Files
          </div>
          <div className="text-white text-lg sm:text-xl font-semibold">
            {filesFetched?.length}
          </div>
        </div>

        <div className="bg-[rgba(100,116,139)]/15  rounded-lg p-3 sm:p-4 opacity-50 border border-white/10">
          <div className="text-yellow-400 text-xs sm:text-sm font-medium mb-1">
            Starred
          </div>
          <div className="text-white text-lg sm:text-xl font-semibold">0</div>
        </div>

        <div className="bg-[rgba(100,116,139)]/15  rounded-lg p-3 sm:p-4 opacity-50 border border-white/10">
          <div className="text-green-400 text-xs sm:text-sm font-medium mb-1">
            Recent
          </div>
          <div className="text-white text-lg sm:text-xl font-semibold">0</div>
        </div>

        <div className="bg-[rgba(100,116,139)]/15  rounded-lg p-3 sm:p-4 opacity-50 border border-white/10">
          <div className="text-purple-400 text-xs sm:text-sm font-medium mb-1">
            Shared
          </div>
          <div className="text-white text-lg sm:text-xl font-semibold">0</div>
        </div>
      </div>

      {/* Files Display */}
      {filesFetched?.length === 0 || filesFetched === null ? (
        <div className="text-center py-12 sm:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
            No files found
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-6">
            {searchQuery
              ? "Try adjusting your search query"
              : "Upload your first file to get started"}
          </p>
          {/* {!searchQuery && (
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors">
              Upload Files
            </button>
          )} */}
        </div>
      ) : (
        <div
          className={
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
          }
        >
          {filesFetched?.map((file) => (
            <FileCard key={file.name} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileGrid;
