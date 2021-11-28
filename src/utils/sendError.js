function sendError(res, error, errorCode) {
    res.writeHead(errorCode, { "Content-Type": "application/json" });
    const restData = {
        error
    }
    res.write(JSON.stringify(restData));
    res.end();
}

module.exports = sendError;