import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { Folder } from './entities/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])], 
  controllers: [FoldersController],
  providers: [FoldersService],
  exports: [TypeOrmModule]
})
export class FoldersModule {}
