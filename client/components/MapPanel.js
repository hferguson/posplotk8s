/**
 * This component implements the map, its controls, and
 * any logic to call Microservices to find waypoints and
 * centre the map.
 */
import React, {useEffect, useState} from "react";
import {Alert} from 'react-bootstrap';
import axios from 'axios';
import getCircularReplacer from '../utils/circ-ref-utils';
import PlottingMap from './PlottingMap';
import AddressListDlg from './AddressListDlg';
import WaypointsList from './WaypointsList';

const MapPanel = () => {
    // Various state variables to use
    const [pointsOnMap, setPointsOnMap] = useState([]); // waypoints that are on the map itself
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
    const [dlgMsg, setDlgMsg] = useState({
        message: '',
        ok: true
    });   // message to be rendered to dialog - if message is empty, no dialog is rendered
    const [dlgDismissed, setDlgDismissed] = useState(false);

    const setErrorMsg = (msg) => {
      //console.log(`Err msg: ${msg}`);
      setDlgMsg({message: msg, ok: false});
      //getWaypoints();
    }
  
    const setOKMsg = (msg) => {
      //console.log(`OK msg: ${msg}`);
      setDlgMsg({message: msg, ok: true});
      //getWaypoints();
    };

    /**
     * This function called from the Address selector dialog. When user clicks on
     * map, there are a variety of options
     * @param address - address including coordinates and city/state/country info
     */
    const selectAddressForRpt = async (address, label) => {
        
        setMapAddrs([]);  // get rid of list
        if (address === null || address === undefined) {
            return;
        }
        await saveWaypoint(address, label);

        setSelMapAddr(address); // set selected address in state to be passed into editor
    };

    // Item in list was clicked. Match to WP on map
    const handleListClick = async (id) => {
        for (let i=0;i<waypoints.length;i++) {
            if (waypoints[i].id === id) {
                setSelWP(waypoints[i]);
                break;
            }
        }
    } 

    const deleteWaypoint = async (id) => {
        try {
            const resp = await axios.delete(`/api/waypoints/delete/${id}`);

            // On success refresh waypoints list
            await getWaypoints();
        } catch (error) {
            setErrorMsg(error.message);
        }
    }
    // TBD: May want to move some of these functions into a class into Utils.
    // make this JS file for only parts that are React or React-ajacent. 
    const getBoundedPoints = async (bounds) => {
        //console.log("Get Bounded Points called");
        try {
            const payload = {bottomLeft: bounds.sw, topRight: bounds.ne};   // transform
            const resp = await axios.post('/api/waypoints/findwithin', payload);

            const points = resp.data;
            if (points != undefined && points != null) {
                //console.log(`Points on map called. ${points.length} waypoints returned`);
                setPointsOnMap(points);
            } 
        } catch (error) {
            setErrorMsg(error.message);
        }
    }
    const getCentre = async () => {
        
        const payload = {lat: mapCtr.lat, lon: mapCtr.lon};
        try {
            const resp = await axios.get('/api/waypoints/center');
                      
            const coords= resp.data;
            if (coords.numpoints > 0) {

                payload.lat = coords.latCtr;
                payload.lon = coords.lonCtr;
            }
            
        } catch (error) {
            setErrorMsg(error.message);
        }
        return payload;
    };

    const getWaypoints = async () => {
        try {
            const resp = await axios.get('/api/waypoints/fetch');
            if (resp.hasOwnProperty('error')) {
                setErrorMsg(resp.error.message);
            } else {
                
                const wps = resp.data || [];
                if (wps.length > 0) {
                    
                    const newCtr = await getCentre();
                    setMapCtr(newCtr);

                    setWaypoints(wps);
                } 
            }
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    const saveWaypoint = async (address, label) => {
        //const address = JSON.parse(JSON.stringify(addr));
        const wp = {};
        const loc = {
            type: 'Point',
            coordinates: [address.longitude, address.latitude]
        };
        // Clumsy copy below. Really it's to reorganize the geopoint above
        // to be MongoDB geo search friendly.
        wp['title']= label.value.length> 0 ? label.value : address.label;
        wp['location'] = loc;
        wp['address_string'] = address.label;
        wp['city'] = address.locality;
        wp['region'] = address.region_code != undefined ? address.region_code : address.region;
        wp['country'] = address.country;
        
        try {
            const resp = await axios.post('/api/waypoints/save', wp);
            
            setOKMsg(`Waypoint ${wp.title} saved`);
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    useEffect(() => {
        getWaypoints();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      useEffect(() => {
        
        if (dlgDismissed) {
          getWaypoints();
          setDlgDismissed(false);
        }
          
      }, [dlgDismissed]);

    return (
        <div>
            <Alert show={dlgMsg.message.length > 0} 
                  transition={null} 
                  variant={dlgMsg.ok ? 'success' : 'danger'} 
                  onClose={(() => {
                                    setDlgMsg({message: '', ok : true}); 
                                    setDlgDismissed(true)})
                                  }  
                  dismissible >
            <p>{dlgMsg.message}</p>
          </Alert>
            <div className="mapComponents">
            <PlottingMap centre={mapCtr} 
                        waypoints={waypoints} 
                        selectedWP={selWP} 
                        setWaypoint={setSelWP} 
                        setAddresses={setMapAddrs} 
                        setWPlist={getBoundedPoints} 
                        delWP={deleteWaypoint} />
            <WaypointsList waypoints={pointsOnMap} clickHandler={handleListClick} />
            </div>
            <AddressListDlg addresses={mapaddrs} addressHandler={selectAddressForRpt} />
        </div>
    )
};

export default MapPanel;