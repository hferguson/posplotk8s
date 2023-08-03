const request = require('supertest');
const app  = require('../../app');

it('Can find all points within 1 km of a specific location', async () => {
    // Populate database with known coordinates.
    const latBase = 45.42554;
    const lonBase = -75.67379;
    let latOffset = 0;
    let lonOffset = 0;
    // 1 degree of lat is 111 km
    // .1 degree of lat is 11.1, and .01 = 1.11 km
    // 1 km = increase of 0.9

    for (let i=0;i<4;i++) {
        const lat = latBase + latOffset;
        const lon = lonBase + lonOffset;
console.log(`${lat}, ${lon}`);
        await wpCreateWithCoords(lat, lon );
        latOffset+=.009;
    }
    // In the above, it will create 4 coordinates, one at the base, and one
    // at 1 km, 2 km, and 3 km away
    // used calculator from NOAA to test co-ordinates distance generated from
    // the above. Their calculator rounds to nearest 1 km.
    // We expet the base waypoint and the first one to match this Geoquery.
    const resp = await request(app)
                        .get(`/api/waypoints/find/${latBase}/${lonBase}/1110`)
                        .expect(200);
    const waypoints = resp.body;
    expect(waypoints.length).toEqual(2);
    console.log(`Returned ${waypoints.length} waypoints`);
});

it('Can find all points within a given geo box', async () => {
    const botLeft = [45.5, -75.6];
    const topRight = [45.7, -75.2];
    const latBase = 45.6;
    const lonBase = -75.4;
    const payload = {bottomLeft: botLeft, topRight: topRight};

    for (let i=0;i<10;i++) {
        const lat = latBase + i*.1;
        const lon = lonBase + i*.1;
        console.log(`${lat}, ${lon}`);
        await wpCreateWithCoords(lat, lon );
    }

    const resp = await request(app)
                        .post('/api/waypoints/findwithin')
                        .send(payload)
                        .expect(200);
    const waypoints = resp.body;
    console.log(waypoints);
    expect(waypoints.length).toEqual(2);

});