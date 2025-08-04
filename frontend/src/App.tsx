import MainView from "@/components/MainView";
import { SelectedFileProvider } from "@/context/SelectedFileContext";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function App() {
  return (
    <SelectedFileProvider>
      <MainView />
    </SelectedFileProvider>
  );
}

export default App;
