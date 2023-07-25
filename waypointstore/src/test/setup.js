const app = require('../app');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
let mongo;


global.wpCreate = async (wp) => {
    //console.log("GLobal user create function");
    //console.log(`creating WP with title ${wp.title}`);
    const resp = await request(app)
                        .post('/api/waypoints/save')
                        .send(wp)
                        .expect(201);
    const point = resp.body;
    //console.log(`WP ${point.title} created`);

    return point;
};

global.wpCreateOne = async () => {
    let payload = {};
    payload.title = "Waypoint # 0";
    payload.location = {
        type: 'Point',
        coordinates: [45.1234, -75.1234]
    };
    payload.address_string = "123 Fake St.";
    payload.city = "Fake town";
    payload.region = "ON";
    payload.country = "Canada";
    return await wpCreate(payload);
    
}
global.wpCreateSeries = async (num) => {
    const latBase = 45.123;
    const lonBase = -75.123;
    let series = [];

    for (let i=0;i<num;i++) {
        //console.log(`Preparing item ${i}`);
        let lat = latBase + (Math.random()-0.5);
        let lon = lonBase + (Math.random()-0.5);
        let payload = {}
        payload.title = `Waypoint # ${i}`;
        payload.location = {
            type: 'Point',
            coordinates: [lat, lon]
        };
        payload.address_string = "123 Fake St.";
        payload.city = "Fake town";
        payload.region = "ON";
        payload.country = "Canada";
        await wpCreate(payload);

    }
 

}
// Things like setting up in-memory db
// see lecture 200 in Section 10 of Microservices course
beforeAll( async () => {
    console.log("Begin test setup");
    mongo = await MongoMemoryServer.create();
    const mongoURI = mongo.getUri();
  
    await mongoose.connect(mongoURI, {});
    console.log("In-memory mongo db set up and connected");
   
});

// ANything that needs to be run before each test
// such as flushing an in-memory database
beforeEach(async () => {
    console.log("Executing prior to test...");
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
    console.log("Database cleared");
});

// Put things like database cleanup here
afterAll(async () => {
    console.log("End test run");
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
})