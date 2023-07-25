const request = require('supertest');
const app  = require('../../app');

it('Returns 10 items previously saved to db', async () => {
    await wpCreateSeries(10);
    
    // Now fetch
    const resp = await request(app)
                        .get('/api/waypoints/fetch')
                        .expect(200);
    //console.log(resp);
    //console.log(resp.body);
    expect(resp.body.length).toEqual(10);
});

it('Gets a centrepoint for 10 coordinates', async () => {
    // Get 10 random waypoints
    await wpCreateSeries(10);

    // Now fetch
    const resp = await request(app)
                        .get('/api/waypoints/center')
                        .expect(200);
    console.log(resp.body);
});