import axios from 'axios';
require("dotenv").config();

const buildClient = ({ req }) => {
  const envName = process.env.NODE_ENV;
  let baseUrl = 'http://mywebsite.local';

  if (envName === 'production') {
    baseUrl = 'https://hfcdevops.xyz';
  }
  if (typeof window === 'undefined') {
    // we are on the server
    console.log("Getting server version");
    
    return axios.create({
      baseURL: baseUrl,
      headers: req.headers,
    });
  }else {
    // we are in the browser
    console.log("Getting Browser version");
    return axios.create( {
        baseUrl: '/',
    });
  }
}
export default buildClient;