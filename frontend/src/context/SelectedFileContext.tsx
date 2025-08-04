import { createContext, useContext, useState, type ReactNode } from "react";

type SelectedFile = {
  name: string;
  url: string;
} | null;

type SelectedFileContextType = {
  selectedFile: SelectedFile;
  setSelectedFile: (file: SelectedFile) => void;
};

export const SelectedFileContext = createContext<SelectedFileContextType | undefined>(undefined);

export const SelectedFileProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

  return (
    <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </SelectedFileContext.Provider>
  );
};

export const useSelectedFile = () => {
  const context = useContext(SelectedFileContext);
  if (!context) {
    throw new Error("useSelectedFile must be used within a SelectedFileProvider");
  }
  return context;
};
