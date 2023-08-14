import Header from "../components/header";
import Footer from "../components/Footer";

const Tech = ({currentUser}) => {

    return (
        <div className="pageBody">
            <Header title="Tech Stack"  currentUser={currentUser} />
            <p>
                The application was written in Javascript.  I use nodeJS for each microservice as well as the client app itself, 
                which relies on React and NextJS.  I also have a <a className="link-info" href="https://www.mongodb.com/">Mongo DB</a> 
                running to store waypoints that are saved by users.
            </p>
            <p>
                The map comes from <a className="link-info" href="https://pigeon-maps.js.org/">Pigeon Maps</a> which provides a ReactJS based mapping
                solution.  I chose them because I wanted a free, open source solution rather than relying on Google maps which is 
                not so free, and not so open.
            </p>
            <p>
                The geo-coding (that is looking up addresses from co-ordinates, or looking up coordinates from addresses) comes from
                <a className="link-info" href="https://positionstack.com/">Position Stack</a>.  They have a tiered service, and I'm using the free one, which
                for a demo project is quite sufficient.  I started down the way of trying to abstract out the provider and making it 
                so that I could switch for a different provider (i.e Location IQ) through the config, but it was taking longer than 
                I intended, and I just wanted to get the CI/CD flow built, so I abandoned that for now.
            </p>
            <p>Since this is a TDD project among other things, I implemented tests in Jest.  At the moment I am struggling with how to 
                properly test React components, and on the service side, testing services that themselves call services. In Jest on my dev
                sandbox, this works just fine, but when the same tests are run in github as a workflow, they fail due to lack of internet 
                connectivity within the containers.  
            </p>
            <p>
                Finally, this was intended to be a containerization/Kubernetes exercise. I use <a className="link-info" href="https://skaffold.dev/">Skaffold</a> to deploy 
                my development containers in <a className="link-info" href="https://minikube.sigs.k8s.io/docs/start/">Minikube</a> which I have running on my Ubuntu 22.04 VM
                on which I developed everything.
            </p>
            <Footer />
        </div>
    )
};
export default Tech;