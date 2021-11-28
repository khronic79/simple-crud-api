const handlers = require('../handlers/person');

const config = {
    'GET': 
            {
                '/person': handlers.getAllPersons,
                '/person/:id': handlers.getPerson,
            },
    'POST': 
            {
                '/person': handlers.createPerson,
            },
    'PUT':
            {
                '/person/:id': handlers.updatePerson,
            },
    'DELETE':
            {
                '/person/:id': handlers.deletePerson,
            },
};

module.exports = config;