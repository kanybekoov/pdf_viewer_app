import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';  
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Folder } from '../folders/entities/folder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File, Folder]) 
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
