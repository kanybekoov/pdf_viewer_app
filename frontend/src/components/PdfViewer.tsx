import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useSelectedFile } from '@/context/SelectedFileContext';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';


export default function PdfViewer() {
      
  const { selectedFile } = useSelectedFile();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!selectedFile) {
    return (
      <div className="flex items-center justify-center h-[90vh] text-gray-500">
        Выберите PDF файл для просмотра
      </div>
    );
  }

  return (
    <div className="h-[90vh] w-full border rounded-md overflow-hidden flex flex-col">
      <div className="p-2 font-semibold border-b truncate">{selectedFile.name}</div>
        <div className="flex-1 overflow-hidden">
        <Worker workerUrl={pdfWorker}>
          <Viewer
            fileUrl={selectedFile.url}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
}
