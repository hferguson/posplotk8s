import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    console.log("Getting server version");
    
    return axios.create({
      baseURL: 'http://oauth-svc:3000/',
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