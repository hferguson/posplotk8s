import React from 'react';
import axios from 'axios';
import { Map, Marker,  Overlay, ZoomControl} from "pigeon-maps";


/**
 * 
 * @param centre - centrepoint of the map
 * @param waypoints - an array of lat/lon coordinates
 * @param selectedWP - coordinates that are "selected"
 * @param setWaypoint - function to reset a waypoint
 * @param setAddresses - function to set address  
 * @returns 
 */
const PlottingMap = ({centre, waypoints, selectedWP, setWaypoint, setAddresses}) => {
    
    // Event handlers
    const handleClick = (event) => {
        
        const payload = event.payload;
        setWaypoint(payload);
    }
    const handleMapClick = (event) => {
        console.log("Map click");
        //console.log(event);
        const [lat,lon] = event.latLng;
        
        axios.get(`/api/position/addrfrompos/${lat}/${lon}`)
            .then(res => {
                    console.log(res)
                    if (res.hasOwnProperty('data')) {
                        // Send address array to main app component
                        setAddresses(res.data.data);
                    } else if (res.hasOwnProperty('error')) {
                        alert(res.error);
                    }
                   
            })
            .catch(error => console.log(error));
    }
    const resetRptModal = (event) => {
        setWaypoint(null);
    }

   
    return (
            
            <Map height={400} width={600} center={[centre.lat, centre.lon]} defaultZoom={14} onClick={handleMapClick}>
            {waypoints.map((wp) => {
                // See note below about MongoDB and co-ordinates.
                let coords = wp.location.coordinates
                return (
                    
                    <Marker key={wp.id} 
                            width={25} 
                            anchor={[coords[1], coords[0]]}
                            payload={wp} 
                            color={selectedWP != null && selectedWP.id === wp.id ? 'yellow' : 'red'}
                            onClick={handleClick} />
                )
            })}
            {/** 
             * to display a pop-up text on the map, we have to use an overlay from the Pigeon
             * library that we're using to display the map. Bootstrap Modal just won't show up.
             * A note about the coordinates.  To allow MongoDB to be able to geo search, I had to
             * store the coordinates in a location object with a Type of Point, and coordinates as an array
             * with longitude first.  Hence array element 1 in front of 0.
             */}
            {selectedWP != null &&
                <Overlay anchor={[selectedWP.location.coordinates[1], selectedWP.location.coordinates[0]]}>
                    <div className="rptOverlay">
                        
                        <p className="modal-title">{selectedWP.title}</p>
                        <button type="button" className="btn-close" onClick={resetRptModal}></button>
                             
                    </div>
                </Overlay>
            }
            <ZoomControl />
            </Map>
        );
};

export default PlottingMap;