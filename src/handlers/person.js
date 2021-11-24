const controllers = require('../controllers/person');
const http = require("http");
const sendError = require('../utils/sendError');

async function getAllPersons(req, res) {
    const persons = await controllers.getAllPersons();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
}

async function getPerson(req = new http.IncomingMessage, res = new http.ServerResponse) {
    const pesonId = req.params.id;
    const reg = RegExp('^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$');
    const check = reg.test(pesonId);
    if (!check) {
        sendError(res, 'Person ID should be in UUID format', 400);
        return;
    }
    const person = await controllers.getPerson(pesonId);
    if (!person) {
        sendError(res, `Record with id ${pesonId} does not exist`, 404);
        return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
}

async function createPerson(req = new http.IncomingMessage, res = new http.ServerResponse) {
    let json;
    try {
        json = JSON.parse(req.body);
    } catch(err) {
        sendError(res, 'Your JSON data has a problem', 400);
    }
    const person = await controllers.createPerson(json);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
}

async function updatePerson(req = new http.IncomingMessage, res = new http.ServerResponse) {
    const id = req.params.id;
    const reg = RegExp('^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$');
    const check = reg.test(id);
    if (!check) {
        sendError(res, 'Person ID should be in UUID format', 400);
        return;
    }
    let json;
    try {
        json = JSON.parse(req.body);
    } catch(err) {
        sendError(res, 'Your JSON data has a problem', 400);
    }
    json.id = id;
    const person = await controllers.updatePerson(json);
    if (!person) {
        sendError(res, `Record with id ${id} does not exist`, 404);
        return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
}

async function deletePerson(req = new http.IncomingMessage, res = new http.ServerResponse) {
    const id = req.params.id;
    const reg = RegExp('^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$');
    const check = reg.test(id);
    if (!check) {
        sendError(res, 'Person ID should be in UUID format', 400);
        return;
    }
    const person = await controllers.deletePerson(id);
    if (!person) {
        sendError(res, `Record with id ${id} does not exist`, 404);
        return;
    }
    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();
}

module.exports = {
    getAllPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}