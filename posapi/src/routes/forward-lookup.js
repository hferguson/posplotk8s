const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();
const api_key = process.env.GEOAPIKEY;
const baseURL = process.env.GEOURL_BASE;

router.post('/posapi/findcoords', async (req, res, next) => {
    // Expectation is body contains JSON object with the following
    // address_string - 123 Fake St
    // city - Springfileld
    // state_prov - OH
    // country - USA
    const {address_string, city, state_prov, country} = req.body;
    const query_string = `${address_string} ${city}, ${state_prov},  ${country}`;
    const params = {
                    access_key: api_key,
                    query: query_string
    };
    const url = `${baseURL}/forward`;
    try {
        console.log(`Using query string ${query_string}`);
        const remResp = await axios.get(url, {params});
        const data = remResp.data.data;
        //console.log(data);
        return res.json(data);
    } catch (error) {
        const resp = error.response;
        //console.log(error);
        const statusCode = resp.status;
        const statusMsg = resp.statusText;
        error.custom_msg = statusMsg;
        console.log(`error calling API on url ${url}`);
        console.log(statusMsg);
        next(error);
    }
});

module.exports = router;