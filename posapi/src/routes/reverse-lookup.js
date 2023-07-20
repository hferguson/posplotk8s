const express = require('express');
const axios = require('axios');

const router = express.Router();

require('dotenv').config();
const api_key = process.env.GEOAPIKEY;
const baseURL = process.env.GEOURL_BASE;

console.log("This is the reverse lookup route");
console.log(`Using endpoint ${baseURL}`);
/**
 * Perform reverse lookup on co-ordinates.
 */
router.get('/posapi/addrfrompos/:lat/:lon', async (req, res, next) => {
    console.log("Received address lookup request");
    
    const lat = req.params.lat;
    const lon = req.params.lon;
    const query_string = `${lat},${lon}`;

    const params = {
        access_key: api_key,
        query: query_string,
        limit: 5
    };
    //console.log(`Using payload data ${params.query}`);
    //console.log(`Calling ${process.env.GEOURL_BASE}/reverse`)
    try {
       const remResp =  await axios.get(`${baseURL}/reverse`, {params});
       console.log("Response received");
       //console.log(remResp.data);
       return res.json(remResp.data);
    } catch(error) {
        // Still figuring out what to do with errors
        console.log("Got error from Position stack API");
        console.log(error);
        const resp = error.response;
        console.log(resp);
        const statusCode = resp.status;
        const statusMsg = resp.statusText;
        error.custom_msg = statusMsg;
        next(error);
    };

});

module.exports = router;