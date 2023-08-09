const axios = require('axios');
require('dotenv').config();

const GITHUB_API_URL = process.env.GITHUB_API_URL;

/**
 * This function calls the Github auth URL with an access
 * token that came from GitHub. With this auth token,
 * call the git hub API and get the user details associated
 * with the token.  Return those details in payload or throw exception
 * @param {} token 
 * @returns 
 */
const getUser = async (token) => {
    console.log("Get User API called");
    const url = GITHUB_API_URL;
    const config = {
        headers: {
            Authorization: token
        }
    }
    
    const resp = await axios.get(url, config);
    return resp.data;
} 

module.exports = getUser;