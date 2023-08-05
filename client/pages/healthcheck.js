
import useRequest from '../hooks/use-request';
import { useState, useEffect } from 'react';
import Header  from '../components/header';
require('dotenv').config();


const HealthCheck = () => {
    const healthURL = '/api/healthmon/scan';
    console.log(healthURL);

    const [services, setServices] = useState([]);

    const {doRequest, errors} = useRequest({
            url: healthURL,
            method: 'get',
            body: {},
            onSuccess: (data) => {
                console.log("successful response");
                console.log(data);
                setServices(data);
            }
    });

    useEffect(() => {
        console.log("Begin useEffect");
        const interval = setInterval(() => {
            console.log("Calling heartbeat service");
            doRequest();
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="pageBody">
            <Header title="Health monitor" />
            <div>
                <div>Number of services: {services.length}</div>
                <table className="table">
                  <thead>
                    <tr>
                        <th scope="col">Service</th>
                        <th scope="col">Status</th>
                        <th scope="col">Last check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(service => {
                        return (
                        <tr key={service.name}>
                            <td>{service.name}</td>
                            <td>{service.status ? "OK" : "Offline"}</td>
                            <td>{service.statusDate}</td>
                        </tr>
                        )
                        })
                    }
                  </tbody>
                </table>
            </div>
        </div>
    )
};

export default HealthCheck;