/**
 * This is the Position API service.  Service is launched from here
 * but the coding is inside app.js. That separation was done to facilitate testing
 */
const app = require('./app');

let port = 3000 || process.env.PORT;

const start = async() => {
    console.log("Starting position API service");
    
};

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
