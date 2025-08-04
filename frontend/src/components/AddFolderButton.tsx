import { Button } from "@/components/ui/button";

type AddFolderButtonProps = {
    setIsModalOpen: (open: boolean) => void;
};

export default function AddFolderButton({ setIsModalOpen }: AddFolderButtonProps) {

      return (
            <div className="AddFolderButton">
                  <Button onClick={() => setIsModalOpen(true)}>Добавить папку</Button>
            </div>
      );
}
