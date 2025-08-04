import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';


@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private folderRepo: Repository<Folder>,
  ) {
  
    this.seed();
  }

  async seed() {
    const count = await this.folderRepo.count();
    if (count === 0) {
      await this.folderRepo.save([
        { name: 'Общая' },
        { name: 'Финансы' },
        { name: 'Аналитика' },
        { name: 'Бухгалтерия' },
      ]);
      console.log('Mock folders created');
    }
  }

 async createFolder(dto: CreateFolderDto): Promise<Folder> {
  const { name } = dto;

  const existing = await this.folderRepo.findOne({ where: { name } });
  if (existing) {
    throw new ConflictException('Папка с таким именем уже существует');
  }

  const folder = this.folderRepo.create({ name });
  return this.folderRepo.save(folder);
}

  async findAll(): Promise<Folder[]> {
    return this.folderRepo.find({ relations: ['files'] });
  }

}
