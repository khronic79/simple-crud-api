const sendRequestToServer = require('./utils/sendRequestToServer');
const createTestServer = require('./utils/createTestServer');
const controllers = require('../src/controllers/person');
const error = require('../src/errros/errors');

let server = null;

describe('E2E CRUD test. Scenario 2', () => {
    beforeAll(() => {
        createTestServer().then((testServer) => {
            server = testServer;
        });
    });
    afterAll(() => {
        server.close();
    });
    it('GET /person problem with db controller', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        jest.spyOn(controllers, 'getAllPersons').mockImplementation(() => {
            return Promise.reject(new error.ControllerError);
        });
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(500);
        expect(jsonData.error).toBe('Houston we have a problem');
    });
    it('GET /person/123e4567-e89b-12d3-a456-426655440000 problem with db controller', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person/123e4567-e89b-12d3-a456-426655440000',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        jest.spyOn(controllers, 'getPerson').mockImplementation(() => {
            return Promise.reject(new error.ControllerError);
        });
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(500);
        expect(jsonData.error).toBe('Houston we have a problem');
    });
    it('POST /person problem with db controller', async () => {
        const postData = JSON.stringify({
            'name': 'John',
            'age': '60',
            'hobbies': ['reading book']
        });
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
        };
        jest.spyOn(controllers, 'createPerson').mockImplementation(() => {
            return Promise.reject(new error.ControllerError);
        });
        const data = await sendRequestToServer(options, postData);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(500);
        expect(jsonData.error).toBe('Houston we have a problem');
    });
    it('PUT /person/123e4567-e89b-12d3-a456-426655440000 problem with db controller', async () => {
        const postData = JSON.stringify({
            'name': 'John',
            'age': '60',
            'hobbies': ['reading book']
        });
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person/123e4567-e89b-12d3-a456-426655440000',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
        };
        jest.spyOn(controllers, 'updatePerson').mockImplementation(() => {
            return Promise.reject(new error.ControllerError);
        });
        const data = await sendRequestToServer(options, postData);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(500);
        expect(jsonData.error).toBe('Houston we have a problem');
    });
    it('DELETE /person/123e4567-e89b-12d3-a456-426655440000 problem with db controller', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person/123e4567-e89b-12d3-a456-426655440000',
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        jest.spyOn(controllers, 'deletePerson').mockImplementation(() => {
            return Promise.reject(new error.ControllerError);
        });
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(500);
        expect(jsonData.error).toBe('Houston we have a problem');
    });
});
