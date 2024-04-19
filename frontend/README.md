## Развертывание через Docker
Склонировать репозиторий в пустую папку.  
Выполнить команду:
```
cp .env.example .env
```
Прописать конфигурацию в файле .env  
Выполнить команды:
```
docker-compose build
docker-compose up -d
docker exec client-app -c 'composer install && cd ./frontend && npm install'
chmod -R 777 ./storage
chmod -R 777 vendor/mpdf/mpdf/tmp/
```
Для запуска сборки фронта в режиме разработки выполнить команду:
```
docker exec client-app bash -c 'cd ./frontend && npm run start'
```
Для продуктовой сборки фронта выполнить команду:
```
docker exec client-app bash -c 'cd ./frontend && npm run build'
```
Для наполнения БД фейковыми вопросами выполните команду в контейнере client-db:
```
php artisan db:seed --class=QuestionSeeder
```
Для наполнения БД фейковыми вопросами выполните команду в контейнере client-db:
```
php artisan db:seed --class=QuestionSeeder
```
Для наполнения БД тестовыми пользователям выполните команду в контейнере client-db:
```
php artisan db:seed --class=UsersModelSeeder
```

Пользователи для тестирования:
tester/123456
admin/123456789
