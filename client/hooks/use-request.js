import axios from 'axios';
import {useState} from 'react';

/**
 * useRequest - a hook to perform calls to various REST services
 * from our client components.  This was copied verbatim from the
 * Udemy Microservices course, but in a nutshell, it takes
 * a URL, a method (GET, POST, etc), a body (probably as JSON), and
 * an onSuccess function to execute if we succeed.
 * 
 * @param {url, method, body, onSuccess} param0 
 * @returns onSUccess return val if successful, a list of errors if not
 */
const useRequest = ({url, method, body, onSuccess }) => {
  // method === 'post', 'get' etc
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    console.log("Begin DoRequest");
    try {
      setErrors(null);
      console.log(`sending request of type ${method} to url ${url}`);
      const response = await axios[method](url, { ...body, ...props});

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch(err) {
      //console.log(err);
      if (err.hasOwnProperty('message')) {
        setErrors(
          <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            <li>{err.message}</li>
          </ul>
          </div>
        );
      } else if (err.hasOwnProperty('response') && err.response.hasOwnProperty('data') && typeof(err.response.data) == 'object') {
     
        console.log(err.response.data);
        setErrors(
          <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map(err => (
                <li key={err.message}>{err.message}</li>
                ))}
          </ul>
        </div>
        );
      } else {
        setErrors(
          <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            <li>{err.message}</li>
          </ul>
          </div>
        );
        setErrors(
          <div className="alert alert-danger">
          <h4>Oops...</h4>
          <span>Unspecified error has occurred</span>
          </div>
        );
      }
    }
  };

  return {doRequest, errors}
}

export default useRequest;