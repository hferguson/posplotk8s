// Will eventually add some banner stuff here
import {useState, useEffect} from 'react';
import axios from 'axios';

const Header = ({currentUser, title}) => {

    const [githubUrl, setGithubUrl] = useState("");

    let ghBaseURL = "";
    let gitClientID = "";
    let gitHubUrl = "";
    async function getGithubLoginUrl() {
        //const token = new URLSearchParams(window.location.search).get("access_token");
        const callingURL = window.location.origin;
        console.log(`Calling URL is ${callingURL}`);
        try {
            const resParm = await axios.get("/api/oauth/params");
            
            //console.log(resParm.data);
            ghBaseURL = resParm.data.github_authURL;
            gitClientID = resParm.data.github_clientID;
            gitHubUrl = `${ghBaseURL}?client_id=${gitClientID}&redirect_uri=${callingURL}/api/oauth/redirect`;
            console.log(`Setting URL to ${gitHubUrl}`);
            setGithubUrl(gitHubUrl);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        //console.log("UseEffect called");
        if (!currentUser)
            getGithubLoginUrl();
        else 
            console.log("Have current user, no need for URL");
        
        console.log(`Git Hub URL ${gitHubUrl}`);
        //console.log(`Healthmon URL: ${process.env.HEALTHMON_URL}`);
        //console.log(process.env);
        
    }, []);
    return (
        <>
            <h1>{title}</h1>
            {currentUser ?
            (
            <>
               <h3>Welcome {currentUser.name}</h3> 
               <div className="authButtons">
                    <a id="logout-button" className="btn btn-block btn-social" href="/signout">Logout</a>
               </div>
            </>
            ) 
            :
            (<>
                <h3>Welcome guest</h3>
                <div className="authButtons">
                <a id="github-button" className="btn btn-block btn-social btn-github" href={githubUrl}>
                    <i className="fa fa-github"></i> Sign in with GitHub
                </a>
                </div>
            </>
            ) }
        </>
      
    )
}

export default Header;