const http = require("http");
const requestParser = require('../parser/requestParser');
const sendError = require('../utils/sendError');

async function serverCallback(req, res) {
    try {
        await requestParser(req, res);
    } catch(err) {
        sendError(res, 'Houston we have a problem', 500);
    }
}

/* const server = http.createServer(async (req, res) => {
    try {
        await requestParser(req, res);
    } catch(err) {
        sendError(res, 'Houston we have a problem', 500);
    }
}); */

// module.exports = server;

module.exports = serverCallback;

