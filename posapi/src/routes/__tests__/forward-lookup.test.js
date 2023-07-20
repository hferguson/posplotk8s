const request = require('supertest');
const app = require('../../app');
const {compareCoords} = require('../../test/test-utils');
const testparms = require('../../test/test-params');
const lat = testparms.lat;
const lon = testparms.lon;
const address_string = testparms.address;
const city = testparms.city;
const state_prov = testparms.state_prov;
const country = testparms.country;


it('returns correct coordinates for address', async () => {
    console.log(`Testing with street address ${address_string}, ${city}`);
    const payload = {address_string, city, state_prov, country};
    const resp = await request(app)
                .post(`/posapi/findcoords`)
                .send(payload)
                .expect(200);

    const addresses = resp.body;
    //console.log(addresses);
    let addr; 
    let equality = false;
    for (let i = 0; i<addresses.length;i++) {
        addr = addresses[i];
        //console.log(`Lat,long: ${addr.latitude}, ${addr.longitude}`);
        equality = compareCoords([lat, lon], [addr.latitude, addr.longitude], 4);
      
        if (equality) {
            console.log("Found one match");
    
            break;
        }

    }
    expect(equality).toEqual(true);
});

