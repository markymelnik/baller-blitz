import supertest from 'supertest';
import app from '../../src/app';
import { Server } from 'http';

let server: Server;

describe('GET /', () => {

    beforeAll(() => {
        server = app.listen();
    })

    afterAll((done) => {
        server.close(done);
    })

    it("responds with 'NBA Battle!'", async () => {
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('NBA Battle');
    });
})