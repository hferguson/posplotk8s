const request = require('supertest');
const app = require('../../app');

it('saves a waypoint to the database', async () => {
    const wp = {
                title: "Generic waypoint",
                location: {
                    type: 'Point',
                    coordinates: [-75.12345, 45.12345]
                },
                address_string: "123 Fake St",
                city: "Nowhereville",
                region: "ON",
                country: "Canada"
                };
    const wpSaved = await wpCreate(wp);
    
    console.log(`ID = ${wpSaved.id}`);
   
});