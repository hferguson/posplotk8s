const request = require('supertest');
const app = require('../../app');

it('Finds a waypoint by its UID', async () => {
   
    const start = Date.now();
    const wpTest = await wpCreateOne();
    const id = wpTest.id;
    //console.log(wpTest);
    console.log(`Created random WP with id ${id}`);
   
    const resp = await request(app)
                        .get(`/api/waypoints/get/${id}`)
                        .expect(200);
    const wpRes = resp.body;
    console.log(`retrieved waypoint ${wpRes.id}. Response status ${resp.status}`);
  
    //expect(wpRes.id).toEqual(id);
    console.log(`Execution time ${Date.now() - start}`);
    console.log("Done");
});