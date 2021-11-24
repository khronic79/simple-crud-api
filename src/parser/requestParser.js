const config = require('./config');
const sendError = require('../utils/sendError');
const getDataFromReq = require('../utils/getDataFromReq');
const parsingUtils = require('./utils');


async function requestParser(req, res) {
    const method = req.method;
    const url = req.url;
    const conf = config[method];
    if (!conf) {
        sendError(res, `Resource ${url} does not exist`, 404);
        return;
    }
    const template = parsingUtils.checkUrl(conf, url);
    if (template === '') {
        sendError(res, `Resource ${url} does not exist`, 404);
        return;
    }
    const params = parsingUtils.getParamsFromUrl(template, url);
    req.params = params;
    const handler = conf[template];
    const body = await getDataFromReq(req);
    req.body = body;
    handler(req, res);
}

module.exports = requestParser;