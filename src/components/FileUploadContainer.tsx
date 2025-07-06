import { CircleArrowDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import type { FileUploadingItem } from "../store/files.store";
interface FileUploadContainerProps {
  fileUploading: FileUploadingItem[];
}
const FileUploadContainer: React.FC<FileUploadContainerProps> = ({
  fileUploading,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, fileUploading]);

  if (fileUploading.length === 0) return;
  return (
    <div
      className="fixed bottom-0 right-8 max-sm:right-0 max-sm:w-[calc(100vw-32px)] max-sm:mr-4 
 mx-auto bg-[rgba(100,116,139)]/15 rounded-t-xl backdrop-blur-xl shadow-lg w-80"
    >
      {/* Header */}
      <div
        className={`${
          isOpen ? "border-b" : ""
        } py-3 border-white/20 px-4 flex justify-between items-center`}
      >
        <h1 className="text-white text-lg font-semibold">Uploading...</h1>
        <CircleArrowDown
          className={`text-white transition-transform duration-500 cursor-pointer ${
            isOpen ? "" : "rotate-180"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div className="p-4 text-white max-h-80 overflow-auto text-sm space-y-3">
          {fileUploading
            ?.slice()
            .reverse()
            .map((file, index) => (
              <div key={index} className="bg-blue-500/10 rounded-md p-3">
                <div className="flex justify-between gap-2">
                  <p className="truncate text-gray-200 w-44">{file.name}</p>
                  <p className="text-blue-400 whitespace-nowrap">{file.size}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      file.progress === 100
                        ? "bg-green-500"
                        : "bg-blue-500 animate-pulse"
                    }`}
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>

                {/* Status Text */}
                <p className="text-right mt-1 text-xs text-gray-300">
                  {file.isFinished
                    ? "Completed"
                    : `Uploading... ${file.progress}%`}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploadContainer;
