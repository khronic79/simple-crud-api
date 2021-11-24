function getDataFromReq(req) {
    return new Promise((resolve, reject) => {
        let jsonString = '';
        req.on('data', (chunk) => {
            jsonString += chunk.toString();
        });
        req.on('end', () => {
            resolve(jsonString);
        });
        req.on('error', (error) => {
            reject(error);
        })
    });
}

module.exports = getDataFromReq;