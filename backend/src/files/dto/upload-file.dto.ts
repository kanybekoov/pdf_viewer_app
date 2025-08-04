import { IsInt, isInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  folderId: number;
}
