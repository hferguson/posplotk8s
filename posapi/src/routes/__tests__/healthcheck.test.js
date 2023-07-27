const request = require('supertest');
const app = require('../../app');

it('returns a 200 response', async () => {
    await request(app)
    .get('/api/position/healthcheck')
    .send()
    .expect(200);
})