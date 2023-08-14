import axios from 'axios';
import {useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header  from '../components/header';
import Footer from '../components/Footer';
import MapPanel from '../components/MapPanel';

require("dotenv").config()


const Landing = ({currentUser}) => {
    
    
    return (
        <div>
            <Header title="Position Plot Home Page" currentUser={currentUser} />
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
            
            
            
            <Footer />
        </div>
    )
};

export default Landing;