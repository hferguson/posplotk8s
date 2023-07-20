const app = require('../app');

// Things like setting up in-memory db
// see lecture 200 in Section 10 of Microservices course
beforeAll( async () => {
    console.log("Begin test setup");
});

// ANything that needs to be run before each test
// such as flushing an in-memory database
beforeEach(() => {
    console.log("Executing prior to test...");
});

// Put things like database cleanup here
afterAll(async () => {
    console.log("End test run");
})