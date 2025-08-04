import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder } from './entities/folder.entity';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() dto: CreateFolderDto): Promise<Folder> {
    return this.foldersService.createFolder(dto);
  }

  @Get()
  findAll(): Promise<Folder[]> {
    return this.foldersService.findAll();
  }
}
