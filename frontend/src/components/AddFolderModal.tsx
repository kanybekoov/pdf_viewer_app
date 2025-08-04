import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddFolderModal({ isOpen, onClose }: ModalProps) {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!folderName.trim()) {
      setError("Название папки обязательно");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Ошибка при добавлении");
      }

      window.dispatchEvent(new Event("folder-created"));
      onClose(); 
    } catch (err: any) {
      setError(err.message);
    } 
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setFolderName("");
      setError("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить папку</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <Input
            id="folderName"
            value={folderName}
            onChange={(e) => {
              setError("");
              setFolderName(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Введите название..."
          />
          {error && <div className="text-sm text-red-500 mt-1">{error}</div>}

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={onClose}>
              Отменить
            </Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
