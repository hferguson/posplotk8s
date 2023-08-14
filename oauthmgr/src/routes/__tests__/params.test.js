const request = require('supertest');
const app = require('../../app');

it('returns valid env data', async () => {
    const resp = await request(app)
    .get('/api/oauth/params')
    .send()
    .expect(200);
    const data = resp.body;
    expect(data).toHaveProperty('github_authURL');
    expect(data).toHaveProperty('github_clientID');
});
