// TODO Написать в README что /person и /person/ - это разные роуты
// TODO В репозитории с приложением имеется файл Readme.md, содержащий подробные инструкции по установке, запуску и использованию приложения
// TODO Ошибки, возникающие при обработке запроса на /person корректно обрабатываются и в случае их возникновения API возвращает статус код 500 с соответствующим сообщением
// TODO Значение PORT хранится в .env
// TODO Hacker scope

const http = require("http");
const requestParser = require('./src/parser/requestParser');
const sendError = require('./src/utils/sendError');

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    try {
        requestParser(req, res);
    } catch(err) {
        sendError(res, 'Houston we have a problem', 500);
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});