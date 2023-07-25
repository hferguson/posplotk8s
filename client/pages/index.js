import Router from 'next/router';
import Header  from '../components/header';
import MapPanel from '../components/MapPanel';
const Landing = () => {
    return (
        <div className="pageBody">
            <Header title="Position Plotter Home page" />
            <div className="text-bg-light p-3">
                <MapPanel />
            </div>
            <div>
                <a href="/healthcheck">Health check</a>
            </div>
        </div>
    )
};

export default Landing;