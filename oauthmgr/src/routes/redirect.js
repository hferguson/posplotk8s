const express = require('express');
const axios = require('axios');
const router = express.Router();
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const {getUser, getJwtPayload} = require('../getuser-github');
var cors = require("cors");

require('dotenv').config();
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const GITHUB_URL = process.env.GITHUB_TOKEN_URL;

router.use(cors({credentials: true, origin: true}));
/**
 * Endpoint called by GitHub if login successful
 */
router.get("/api/oauth/redirect", async (req, res) => {
    const queryCode = req.query.code;
    const url = `${GITHUB_URL}`;
    const payload = {client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code: queryCode};
    const headers = {Accept: 'application/json'};
    //console.log("OAuth redirect called");
    
    try {
        console.log(`OAuth redirect service called with code ${queryCode}`);
        
        const resp = await axios.post(url, payload, headers);
        console.log("Response received");

        const data = querystring.parse(resp.data);
        const myToken = data.access_token;
        console.log(myToken);

        // Rather than sending token back to client, let's get it here
        // and save the results into a JWT
        const userData = await getUser(myToken);
        console.log("Got user data");
        const jwtPayload = getJwtPayload( userData);
        console.log("Got JWT");
        //console.log(jwtPayload);
        const userJwt = jwt.sign(jwtPayload, JWT_SECRET);
        console.log("Setting JWT in req");
        req.session = {jwt: userJwt};
        
        console.log(`redirecting to ${process.env.BASE_URL}`);
        res.redirect(process.env.BASE_URL);
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
        //console.log(process.env);
        return res.status(500).send({error: error});
    }
});

module.exports = router;

