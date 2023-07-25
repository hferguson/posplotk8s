/**
 * This component implements the map, its controls, and
 * any logic to call Microservices to find waypoints and
 * centre the map.
 */
import React, {useEffect, useState} from "react";
import axios from 'axios';
import PlottingMap from './PlottingMap';

const MapPanel = () => {
    const [mapaddrs,setMapAddrs] = useState([]);    // Addresses found when user clicks on map
    const [waypoints, setWaypoints] = useState([]); // waypoints already stored in bylaw db
    const [mapCtr, setMapCtr] = useState({          // calculated map center - defaults to Sandy Hill
      lat: 45.4253,
      lon: -75.6829
    });
    const [selMapAddr,setSelMapAddr] = useState(null); // Map address from reverse lookup that user
                                                        // indicated is the address of the incident they 
                                                        // want to report
    const [selWP, setSelWP] = useState(null);   // currently selected waypoint to display details about
    
    
    return (
        <div>
            <PlottingMap centre={mapCtr} waypoints={waypoints} selectedWP={selWP} setWaypoint={setSelWP} setAddresses={setMapAddrs} />
        </div>
    )
};

export default MapPanel;