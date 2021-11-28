const http = require("http");
const serverCallback = require('./src/server/serverCallback');
require('dotenv').config();

const PORT = process.env.PORT;

const server = http.createServer(serverCallback);

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});