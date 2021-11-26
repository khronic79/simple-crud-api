const sendRequestToServer = require('./utils/sendRequestToServer');
const createTestServer = require('./utils/createTestServer');
let personId = '';
let server = null;

describe('E2E CRUD test. Scenario 1', () => {
    beforeAll(() => {
        createTestServer().then((testServer) => {
            server = testServer;
        });
    });
    afterAll(() => {
        server.close();
    });
    it('Get all users from server (database is empty)', async () => {
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
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(jsonData.length).toBe(0);
    });
    it('Create new user in database', async () => {
        const postData = JSON.stringify({
            'name': 'Ivan',
            'age': '30',
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
        personId = jsonData.id;
        expect(jsonData.name).toBe('Ivan');
        expect(jsonData.age).toBe('30');
        expect(jsonData.hobbies[0]).toBe('tv show');
    });
    it('Get created user from database', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: `/person/${personId}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(jsonData.name).toBe('Ivan');
        expect(jsonData.age).toBe('30');
        expect(jsonData.hobbies[0]).toBe('tv show');
        expect(jsonData.id).toBe(personId);
    });
    it('Update create user in database', async () => {
        const postData = JSON.stringify({
            'name': 'John',
            'age': '60',
            'hobbies': ['reading book']
        });
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: `/person/${personId}`,
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
        };
        const data = await sendRequestToServer(options, postData);
        const jsonData = JSON.parse(data.body);
        personId = jsonData.id;
        expect(jsonData.name).toBe('John');
        expect(jsonData.age).toBe('60');
        expect(jsonData.hobbies[0]).toBe('reading book');
        expect(jsonData.id).toBe(personId);
    });
    it('Delete created user from database', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: `/person/${personId}`,
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        const data = await sendRequestToServer(options);
        expect(data.code).toBe(204);
    });
    it('Try to get deleted user from database', async () => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: `/person/${personId}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 0
            }
        };
        const data = await sendRequestToServer(options);
        const jsonData = JSON.parse(data.body);
        expect(data.code).toBe(404);
        expect(jsonData.error).toBe(`Record with id ${personId} does not exist`);
    });
});
