const request = require('supertest');
const app = require('../../app');

it('returns a 200 response', async () => {
    await request(app)
    .get('/posapi/healthcheck')
    .send()
    .expect(200);
})