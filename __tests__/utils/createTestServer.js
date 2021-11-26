const server = require('../../src/server/server');

function createTestServer() {
    return new Promise((resolve, reject) => {
        server.listen(5000, () => {
            resolve(server);
        });
        server.on('error', (error) => {
            server.close();
            throw error;
        })
    });
}

module.exports = createTestServer;