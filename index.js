// TODO Написать в README что /person и /person/ - это разные роуты
// TODO В репозитории с приложением имеется файл Readme.md, содержащий подробные инструкции по установке, запуску и использованию приложения
// TODO Значение PORT хранится в .env
const http = require("http");
const serverCallback = require('./src/server/serverCallback');
require('dotenv').config();

const PORT = process.env.PORT;

const server = http.createServer(serverCallback);

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});