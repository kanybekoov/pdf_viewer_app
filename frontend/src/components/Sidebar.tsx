import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { FileType, FolderType, DateGroupedFiles } from "@/types";
import { useSelectedFile } from "@/context/SelectedFileContext";
import { API_ENDPOINTS } from "@/lib/constants";


type ViewMode = "date" | "folder";

export default function Sidebar() {
  const [viewMode, setViewMode] = useState<ViewMode>("date");
  const [dateGroupedFiles, setDateGroupedFiles] = useState<DateGroupedFiles[]>([]);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const { selectedFile, setSelectedFile } = useSelectedFile();



  const fetchFiles = useCallback(async () => {
    try {

      const response = await fetch(API_ENDPOINTS[viewMode]);
      const data = await response.json();
      viewMode === "date" ? setDateGroupedFiles(data) : setFolders(data);

    } catch (error) {
      console.error("Ошибка при загрузке файлов:", error);
    }
  }, [viewMode]);


  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);


  useEffect(() => {
    const handleFolderCreated = () => fetchFiles();
    window.addEventListener("folder-created", handleFolderCreated);
    return () => {
      window.removeEventListener("folder-created", handleFolderCreated);
    };
  }, [fetchFiles]);



  const handleFileSelect = (file: FileType) => {
    const fileUrl = `http://localhost:3000/files/${file.path}`;
    setSelectedFile({ name: file.name, url: fileUrl });
  };


  const renderFileGroup = (groupTitle: string, files: FileType[]) => (
    <div key={groupTitle} className="mb-4">
      <h3 className="font-semibold text-lg mb-1">{groupTitle}</h3>
      <ul className="space-y-1 pl-2">
        {files.map((file) => {
          const fileUrl = `http://localhost:3000/files/${file.path}`;
          const isActive = selectedFile?.url === fileUrl;

          return (
            <li
              key={file.id}
              onClick={() => handleFileSelect(file)}
              className={`flex text-lg items-center gap-2 cursor-pointer px-2 py-1 rounded transition-colors ${isActive ? "bg-blue-100 font-semibold" : "hover:bg-blue-50"
                }`}
            >
              <FileText className="w-4 h-4 text-black-500" />
              <span>{file.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const renderContent = () => {
    return viewMode === "date"
      ? dateGroupedFiles.map((group) => renderFileGroup(group.date, group.files))
      : folders.map((folder) => renderFileGroup(folder.name, folder.files));
  };

  return (
    <aside className="Sidebar w-100 bg-gray-100 p-4 overflow-y-auto border-r bg-white">
      <h1 className="FolderName">{viewMode=="date" ? "Файлы" : "Папки"}</h1>
      <div className="flex gap-1 mb-4 border border-gray-300 rounded-lg w-fit">
        
        <Button
          className="w-full"
          variant={viewMode === "date" ? "default" : "outline"}
          onClick={() => setViewMode("date")}
        >
          Дата
        </Button>
        <Button
          className="w-full"
          variant={viewMode === "folder" ? "default" : "outline"}
          onClick={() => setViewMode("folder")}
        >
          Папки
        </Button>
      </div>
      {renderContent()}
    </aside>
  );
}
