import Sidebar from "./Sidebar";
import PdfViewer from "./PdfViewer";
import AddFolderButton from "./AddFolderButton";
import AddFolderModal from "./AddFolderModal";

import { useState } from "react";

export default function MainView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden border border-gray-300 bg-white rounded-lg">
      <Sidebar />

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Просмотр PDF-файлов</h1>
          <AddFolderButton  setIsModalOpen={setIsModalOpen}/>
          
        </div>

        <PdfViewer />
      </div>
      <AddFolderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
