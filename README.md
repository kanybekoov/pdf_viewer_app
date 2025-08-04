# PdfViewer App 

Приложение для загрузки и просмотра PDF-файлов с сортировкой по дате и папкам. 

Реализовано:
- Просмотр pdf файлов
- Сортировка файлов по Дате и по Папкам
- Кнопка для добавление новой папки с валидацией
- Добавление нового файла через Rest API (через Postman) с валидацией
- Создание mock папок и файлов при запуске программы
- Обработка ошибок при неправильном создании папок и файлов


##  Стек технологий
- Backend: NestJS + PostgreSQL + TypeORM
- Frontend: React + Vite + Shadcn + React PDF Viewer
- Сборка: Docker + Docker Compose

## Как запустить проект
1. Клонируй репозиторий или скачай ZIP файл проекта:
```bash
git clone https://github.com/your-username/pdf_viewer_app.git

2. Установи Docker Desktop и запусти его

3. Открой проект и в корневой папке PDF_Viewer_fullstack_app запусти команду в терминале
 - docker-compose up --build
 - Если после запуска верхней команды выходит ошибка по базе, запусти команду
 - docker-compose down -v
  и снова запусти команду: docker-compose up --build

 4. Открой в браузере 
 - http://localhost:5173

5. Адресы:

- Backend: http://localhost:3000

- Frontend: http://localhost:5173

- PostgreSQL: порт 5432

6. Загрузка файла через REST Api:
- URL : http://localhost:3000/files
- Method: POST
- Ввод данных: Body -> form-data
Пример для ввода данных:

Key         Value

file        fileName.pdf
name        FileName
folderId    1

7. Endpoint для получения данных:

Список всех папок:
GET - http://localhost:3000/folders  

Получить список файлов по дате
GET - http://localhost:3000/files/by-date

Получить список файлов по папкам
GET - http://localhost:3000/files/by-folders


