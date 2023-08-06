import Header  from '../components/header';
import Footer from '../components/Footer';
const Why = () => {
    return (
        <div className="pageBody">
        <Header title="Why I did this" />
            <p>
                This application is something I put together after taking a Microservices course on Udemy.
                It covered a lot of stuff from test driven design (TDD) to nodeJS to how to build out your
                application for deployment in Docker and Kubernetes.  It also had a whole bit on CI/covered
                using GitHub.
                I wanted to not forget it all, so I took an application I build a year ago, and generalized it
                then re-implemented it as a microservices app. 
                This simple app is just a map from Pigeon Maps (like Google maps but free and open source),
                that anyone can plot random waypoints on.  Any waypoint in the field of view gets listed beside 
                the map.
                I chose this mapping because I've always been a little interested in navigation and orienteering.
            </p>
            <p>
                Ultimately, I want to have a template for a complete end to end (developer's VM to Enteprise cluster) CI/CD 
                pipeline in case I ever need to do this in the future.
                Others can use this site and this project as a template for nodeJS, React, and microservices.
                I wrote this whole thing in Javascript rather than Typescript for 2 reasons: 1) I'm not terribly familiar
                with Typescript, and 2) the original Microservices course had us writing our services in TS, and I wanted 
                to be sure I grasped to concepts so I transposed back to JS.
            </p>
            <Footer />
        </div>
    )
};
export default Why;
