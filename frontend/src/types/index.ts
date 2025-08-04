export type FileType = {
  id: number;
  name: string;
  path: string;
  createdAt: string;
};

export type FolderType = {
  id: number;
  name: string;
  files: FileType[];
};

export type DateGroupedFiles = {
  date: string;
  files: (FileType & {
    folder: FolderType;
  })[];
};
