import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Folder } from '../folders/entities/folder.entity';
import { UploadFileDto } from './dto/upload-file.dto';
import { generateMockFiles } from './mock-files.generator';


@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,

    @InjectRepository(Folder)
    private readonly folderRepo: Repository<Folder>,
  ) {
     generateMockFiles(this);
  }
 
  async saveFile(
    file: Express.Multer.File,
    dto: UploadFileDto,
  ): Promise<File> {


    const folder = await this.folderRepo.findOne({
      where: { id: dto.folderId },
    });

    if (!folder) {
      throw new NotFoundException(`Folder with id = ${dto.folderId} NOT found`);
    }

    const newFile = this.fileRepo.create({
      name: dto.name,
      path: file.filename,
      folder,
    });

    return this.fileRepo.save(newFile);
  }


async getFilesGroupedByDate(): Promise<Array<{ date: string; files: File[] }>> {
  const files = await this.fileRepo.find({
    relations: ['folder'],
    order: { createdAt: 'DESC' },
  });

  const groupedMap = new Map<string, File[]>();

  for (const file of files) {
    const dateKey = file.createdAt.toISOString().split('T')[0];
    if (!groupedMap.has(dateKey)) {
      groupedMap.set(dateKey, []);
    }
    groupedMap.get(dateKey)!.push(file);
  }

  return Array.from(groupedMap.entries()).map(([date, files]) => ({
    date,
    files,
  }));
}


  async getFilesGroupedByFolders(): Promise<
    { id: number; name: string; files: File[] }[]
  > {
    const folders = await this.folderRepo.find({
      relations: ['files'],
      order: { createdAt: 'ASC' },
    });

    return folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      files: folder.files,
    }));
  }

  async findByNameAndFolder(name: string, folderId: number): Promise<File | null> {
  return this.fileRepo.findOne({
    where: {
      name,
      folder: { id: folderId },
    },
    relations: ['folder'],
  });
}
}