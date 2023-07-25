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
    // Get 4 coords that make a square
    const coords = [[45,-75], [46, -75], [46,-76], [45, -76] ];
    for (let i=0;i<coords.length;i++) {
        console.log(`Creating waypoint ${i}`);
        let wp = await wpCreateWithCoords(coords[i][0], coords[i][1]);
    }
   

    // Now fetch
    const resp = await request(app)
                        .get('/api/waypoints/center')
                        .expect(200);
    // expect the centre to be at 45.5, -75.5
    const ctr = resp.body;
    expect(ctr.latCtr).toEqual(45.5);
    expect(ctr.lonCtr).toEqual(-75.5);
    console.log(resp.body);
});