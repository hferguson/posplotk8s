const request = require('supertest');
const app = require('../../app');
const testparms = require('../../test/test-params');
const {compareCoords} = require('../../test/test-utils');
const lat = testparms.lat;
const lon = testparms.lon;

it('Returns a valid address', async () => {
    const resp = await request(app)
    .get(`/posapi/addrfrompos/${lat}/${lon}`)
    .send()
    .expect(200);
    const data = resp.body.data;
    let equality = false;
    //console.log(data);
    for (let i=0;i<data.length;i++) {
        let rec = data[i];
        //console.log(rec);
        if (!compareCoords([lat, lon], [rec.latitude, rec.longitude], 4)) {
            console.log("Co-ords do not match");
            console.log(`Got ${rec.latitude}, ${rec.longitude} expected ${lat}, ${lon}`)
        } else {
            console.log("Coords match");
            equality = compareAddressEqual(rec);
            if (equality) {
                break;
            }
        }
        
    }
    expect(equality).toEqual(true);
});


function compareAddressEqual(rec) {
    let equality = false;
    if (testparms.country === rec.country) {
        if (testparms.state_prov === rec.region_code) {
            if (testparms.city === rec.locality) {
                console.log(`${rec.name} vs ${testparms.address}`);
                equality = true;
            }
        }
    }
    return equality;

}