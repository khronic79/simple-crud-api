const serverCallback = require('../../src/server/serverCallback');
const http = require("http");

function createTestServer(port) {
    const server = http.createServer(serverCallback);
    return new Promise((resolve, reject) => {
        server.listen(port, () => {
            resolve(server);
        });
        server.on('error', (error) => {
            server.close();
            throw error;
        })
    });
}

module.exports = createTestServer;