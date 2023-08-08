/**
 * This service app is to authenticate users usint their github credentials.
 * I may expand this to Google, but probably not Facebook, coz they're toxic
 */
const app = require('./app');
const port = 3000;

app.listen(port,  () => {
    console.log(`OAuth authentication service listening on port ${port}`);
});




