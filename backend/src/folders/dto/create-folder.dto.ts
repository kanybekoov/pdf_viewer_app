import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty({message: 'Folder name can not be empty'})
  @IsString()
  name: string;
}
