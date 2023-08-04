import React from 'react';

/**
 * This components lists waypoint details in a table. 
 * It represents all the points found on the map in the current view.
 * When the view changes, this list does too
 */

const WaypointsList = ({waypoints, clickHandler}) => {
    const handleClick = (event) => {
        console.log("List click event");
        const elem = event.target;
        const row = elem.parentElement;
        const id = row.id;
        console.log(`right click for row ${id}`);
        clickHandler(id);
    }

    return (
        <div>
            <table className="table table-sm table-hover waypoints-list">
                <thead>
                    <tr>
                        <th scope="col">&nbsp;</th>
                        <th scope="col">Title</th>
                        <th scope="col">Coordinates</th>
                    </tr>
                </thead>
                {waypoints != null && waypoints != undefined ? 
                    (
                        <tbody>
                        {waypoints.map((wp) => {
                            let ttText = wp.address_string + ", " + wp.city + ", " + wp.region + ", " + wp.country;
                            return (
                                <tr scope="row" key={wp.id} id={wp.id} onClick={handleClick}>
                                    <td>

                                    </td>
                                    <td title={ttText }>
                                        {wp.title}
                                    </td>
                                    <td>
                                        {wp.location.coordinates[1]}, {wp.location.coordinates[0]}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    ) : <tbody></tbody>
                }    
                
            </table>
        </div>
    )
}
export default WaypointsList;