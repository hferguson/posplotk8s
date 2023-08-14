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
    console.log(`Get User API called with token ${token}`);
    const url = GITHUB_API_URL;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(`git hub URL ${url}`);
    const resp = await axios.get(url, config);
    return resp.data;
} 

// Put commont values into id, name, email, and remainder into vendor
// so that we have a common format for all the providers.
const getJwtPayload = (data) => {
    
    const payload = {id: data.id, name: data.name, email: data.email, vendor: data};
    return payload;
}
module.exports = {getUser, getJwtPayload};