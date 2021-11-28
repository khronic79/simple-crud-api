const http = require('http');

function sendRequestToServer(options, dataForSending) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            const code = res.statusCode;
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
              body += chunk.toString();
            });
            res.on('end', () => {
                resolve({
                    code,
                    body
                });
            });
        });
          
        req.on('error', (e) => {
            reject(e);
        });
        if (dataForSending) {
            req.write(dataForSending);
        }
        req.end();
    });
}

module.exports = sendRequestToServer;