const request = require('supertest');
const app  = require('../../app');

it('returns 200 on successful healthcheck', async () => {
    await request(app)
    .get('/api/waypoints/healthcheck')
    .send()
    .expect(200);
});