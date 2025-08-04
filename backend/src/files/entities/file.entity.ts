import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Folder } from '../../folders/entities/folder.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Folder, (folder) => folder.files, { onDelete: 'SET NULL' })
  folder: Folder;
}