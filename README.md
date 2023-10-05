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
docker exec billing-client-app bash -c 'cd ./backend && composer install && cd ../frontend && npm install'
chmod 777 -R ./storage
docker exec billing-client-app bash -c 'cd ./backend && php artisan migrate'
```
Для запуска сборки фронта в режиме разработки выполнить команду:
```
docker exec billing-client-app bash -c 'cd ./frontend && npm run start'
```
Для продуктовой сборки фронта выполнить команду:
```
docker exec billing-client-app bash -c 'cd ./frontend && npm run build'
```


export GIT_SSL_NO_VERIFY=1<br>
curl -k https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash<br>
source ~/.bashrc<br>
(перезагрузить докер контейнер)<br>
nvm install 16.13.0<br>
