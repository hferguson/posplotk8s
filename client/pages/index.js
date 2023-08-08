import axios from 'axios';
import {useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header  from '../components/header';
import Footer from '../components/Footer';
import MapPanel from '../components/MapPanel';

require("dotenv").config()


const Landing = () => {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [githubUrl, setGithubUrl] = useState("");

    let ghBaseURL = "";
    let gitClientID = "";
    let gitHubUrl = "";
    async function getUserData() {
        const token = new URLSearchParams(window.location.search).get("access_token");
        
        try {
            const resParm = await axios.get("/api/oauth/params");
            //console.log(resParm.data);
            ghBaseURL = resParm.data.github_authURL;
            gitClientID = resParm.data.github_clientID;
            gitHubUrl = `${ghBaseURL}?client_id=${gitClientID}&redirect_uri=http://mywebsite.local/api/oauth/redirect`;
            setGithubUrl(gitHubUrl);
            if (token != null && token != undefined && token.length > 0) {
                const res = await axios
                                    .get("/api/oauth/userdata/github", {
                                    headers: {
                                        Authorization: "token " + token,
                                    },
                                    });
                setUser(res.data);
                setLoggedIn(true);
            }
        } catch(error)  {
            console.log(error);
        };
    };
    useEffect( () => {
        
        getUserData();
        
        //console.log(`Git Hub URL ${gitHubUrl}`);
        //console.log(`Healthmon URL: ${process.env.HEALTHMON_URL}`);
        //console.log(process.env);
        
    }, []);
    return (
        <div className="pageBody">
            <Header title="Position Plotter Home page" />
            <p>This is a simple map that you can add your own waypoints to.  This service currently hosted on
                Digital Ocean, and I haven't decided how long I can keep it up.  Note that I didn't make this 
                a super secure application. Anyone can add or remove waypoints.  As this is just an experiment, 
                and I wanted to make this accessible, I didn't do any sort of cookie based sign-in, but may 
                do that later.
            </p>
            <div className="text-bg-light p-3">
                <MapPanel />
            </div>
            <div>
                <ul>
                <li><a href="/why" className="link-info">Why I did this</a></li>
                <li><a href="/tech" className="link-info">Technical details</a> (you can also look at my Git Hub at the link below)</li>
                <li><a href="/healthcheck" className="link-info">Health check</a> - a simple nodeJS/express service that checks the other services</li>
                <li><a href="https://github.com/hferguson/posplotk8s" className="link-info">My github repo</a></li>
                <li><a href="/todo" className="link-info">To-do list</a> - some of which I may get to</li>
                </ul>
            </div>
            <p>
            {!loggedIn ? (
        <>
          <img
            className="mb-4"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            width="150"
          ></img>
         
          <Button
            type="primary"
            className="btn"
            size="lg"
            href={githubUrl}
          >
            Sign in
          </Button>
        </>
      ) : (
        <>
          <p>
            This is a simple integration between OAuth2 on GitHub with Node.js
          </p>

          <div>
            {[...Array(1)].map((e, i) => (
              <div style={{ maxWidth: "25%", margin: "auto" }}>
                <div>
                  <img src={`${user.avatar_url}`} />
                </div>
                <div>
                  <div>{user.name}</div>
                  <div>{user.bio}</div>
                  <a href={user.html_url}>GitHub Profile</a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
            </p>
            <Footer />
        </div>
    )
};

export default Landing;