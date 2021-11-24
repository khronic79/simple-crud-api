const http = require("http");
const requestParser = require('./src/parser/requestParser');
const sentError = require('./src/utils/sendError');

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    try {
        requestParser(req, res);
    } catch(err) {
        sentError(res, 'Houston we have a problem', 500);
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});