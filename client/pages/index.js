import Router from 'next/router';
import Header  from '../components/header';
import Footer from '../components/Footer';
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
                <li><a href="/why" className="link-info">Why I did this</a></li>
                <li><a href="/tech" className="link-info">Technical details</a> (you can also look at my Git Hub at the link below)</li>
                <li><a href="/healthcheck" className="link-info">Health check - a simple nodeJS/express service that checks the other services</a></li>
                <li><a href="https://github.com/hferguson/posplotk8s" className="link-info">My github repo</a></li>
                </ul>
            </div>
            <p>
                if you like this project, like me on Git Hub
            </p>
            <Footer />
        </div>
    )
};

export default Landing;