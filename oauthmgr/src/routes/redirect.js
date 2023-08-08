const express = require('express');
const axios = require('axios');

const router = express.Router();
var cors = require("cors");

require('dotenv').config();
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GITHUB_URL = process.env.GITHUB_TOKEN_URL;

const parseResponse = (dataStr) => {
    let data = {};
    
    try {
        dataStr = decodeURI(dataStr).replace(/&/g, '","').replace(/=/g,'":"');
        dataStr = '{"' + dataStr + '"}';
        data = JSON.parse(dataStr);
    } catch (error) {
        console.error(`Unable to parse string ${dataStr}`);
        console.error(error);
    }
    return data;
};

router.use(cors({credentials: true, origin: true}));
/**
 * Endpoint called by GitHub if login successful
 */
router.get("/api/oauth/redirect", async (req, res) => {
    const queryCode = req.query.code;
    const url = `${GITHUB_URL}`;
    const payload = {client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code: queryCode};
    const headers = {Accept: 'application/json'};
    console.log("OAuth redirect called");
    try {
        //console.log(`OAuth redirect service called with code ${queryCode}`);
        //console.log(`url : ${url}`);
        //console.log(payload);
        const resp = await axios.post(url, payload, headers);
        console.log("Response received");
        //console.log(resp);
        const data = parseResponse(resp.data);
        const myToken = data.access_token;
        console.log(myToken);
        const redirUrl = `${process.env.BASE_URL}?access_token=${myToken}`;
        console.log(redirUrl);
        res.redirect(redirUrl);
    } catch (error) {
        let statusCode = 500;
        console.log("Exception caught");
        //console.log(error);
        if (error.hasOwnProperty('response')) {
            const response = error.response;
            statusCode = response.statusCode;
            console.log(`Exception caught ${response.statusText}`);
            console.log(response.data);
        }
        return res.status(500).send({error: error});
    }
});

module.exports = router;

