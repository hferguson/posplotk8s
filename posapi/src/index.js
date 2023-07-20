
const app = require('./app');

let port = 3001 || process.env.PORT;


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});