const request = require('supertest');
const app = require('../../app');

it('deletes an existing waypoint', async () => {
    const wpTest = await wpCreateOne();
    const id = wpTest.id;

    console.log(`created waypoint to delete ${id}`);
    const resp = await request(app)
                        .delete(`/api/waypoints/delete/${id}`)
                        .expect(200);
    console.log("Return from delete");
    
    const shouldNotWork = await request(app)
                                .get(`/api/waypoints/get/${id}`)
                                .expect(404);
                                
    console.log(shouldNotWork.body);
});