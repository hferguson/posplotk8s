import Router from 'next/router';
import Header  from '../components/header';
import MapPanel from '../components/MapPanel';
const Landing = () => {
    return (
        <div className="pageBody">
            <Header title="Position Plotter Home page" />
            <p>This is a simple map that you can add your own waypoints to.  This service currently hosted on
                Digital Ocean, and I haven't decided how long I can keep it up.
            </p>
            <div className="text-bg-light p-3">
                <MapPanel />
            </div>
            <div>
                <ul>

                </ul>
                <li><a href="/why">Why I did this</a></li>
                <li><a href="/healthcheck">Health check - a simple nodeJS/express service that checks the other services</a></li>
                <li><a href="https://github.com/hferguson/posplotk8s">My github repo</a></li>
            </div>
        </div>
    )
};

export default Landing;