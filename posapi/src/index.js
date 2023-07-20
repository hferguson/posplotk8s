
const app = require('./app');

let port = 3000 || process.env.PORT;

const start = async() => {
    console.log("Starting pos API service");
    
};

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
