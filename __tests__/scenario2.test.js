const sendRequestToServer = require('./utils/sendRequestToServer');
const createTestServer = require('./utils/createTestServer');
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
    it('GET /person/{personId} personId is not valid UUID', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person/12345678',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(400);
        expect(jsonData.error).toBe('Person ID should be in UUID format');
    });
    it('GET /person/123e4567-e89b-12d3-a456-426655440000 personId does not exist', async () => {
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
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(404);
        expect(jsonData.error).toBe('Record with id 123e4567-e89b-12d3-a456-426655440000 does not exist');
    });
    it('POST /person There are not required data in request body', async () => {
        const postData = JSON.stringify({
            'name': 'Ivan',
            'hobbies': ['tv show']
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
        const data = await sendRequestToServer(options, postData);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(400);
        expect(jsonData.error).toBe('Your JSON data has a problem');
    });
    it('PUT /person/123456 personId is not valid UUID', async () => {
        const postData = JSON.stringify({
            'name': 'Ivan',
            'hobbies': ['tv show']
        });
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person/123456',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
        };
        const data = await sendRequestToServer(options, postData);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(400);
        expect(jsonData.error).toBe('Person ID should be in UUID format');
    });
    it('PUT /person/123e4567-e89b-12d3-a456-426655440000 personId does not exist', async () => {
        const postData = JSON.stringify({
            'name': 'Ivan',
            'hobbies': ['tv show']
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
        const data = await sendRequestToServer(options, postData);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(404);
        expect(jsonData.error).toBe('Record with id 123e4567-e89b-12d3-a456-426655440000 does not exist');
    });
    it('DELETE /person/{personId} personId is not valid UUID', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/person/12345678',
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(400);
        expect(jsonData.error).toBe('Person ID should be in UUID format');
    });
    it('DELETE /person/123e4567-e89b-12d3-a456-426655440000 personId does not exist', async () => {
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
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(404);
        expect(jsonData.error).toBe('Record with id 123e4567-e89b-12d3-a456-426655440000 does not exist');
    });
});
