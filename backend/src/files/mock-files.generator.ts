import { FilesService } from './files.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';

function createPdf(filePath: string, text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.text(text);
    doc.end();
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

export async function generateMockFiles(filesService: FilesService) {
  const outputDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const mockFiles = [
    { filename: 'mock1.pdf', name: 'MockFile1', content: 'This is mock file 1', folderId: 1 },
    { filename: 'mock2.pdf', name: 'MockFile2', content: 'This is mock file 2', folderId: 2 },
  ];

  for (const mock of mockFiles) {
    const existing = await filesService.findByNameAndFolder(mock.name, mock.folderId);
    if (existing) {
      console.log(`File "${mock.name}" is already exist — skipped`);
      continue;
    }

    const filePath = path.join(outputDir, mock.filename);

    try {
      await createPdf(filePath, mock.content);

      const buffer = fs.readFileSync(filePath);
      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: mock.filename,
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: buffer.length,
        destination: outputDir,
        filename: mock.filename,
        path: filePath,
        buffer,
        stream: null as any,
      };

      const dto: UploadFileDto = {
        name: mock.name,
        folderId: mock.folderId,
      };

      await filesService.saveFile(file, dto);
      console.log(`Mock file "${mock.name}" created successfully`);
    } catch (err) {
      console.error(`Error while creating  ${mock.name}:`, err.message);
    }
  }
}
