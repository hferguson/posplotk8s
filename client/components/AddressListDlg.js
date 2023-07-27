import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

const AddressListDlg = ({addresses, addressHandler}) =>{
    
    const closeForm = (event) => {
        addressHandler(null);
    } 

    const setAddress = (event) => {
        let chboxes = document.querySelectorAll('input[name="selectedAddress"]');
        const label = document.getElementById("addressLabel");
        for (const cb of chboxes) {
            if (cb.checked) {
                const idx = cb.value;
                console.log(`selected row ${idx}`)
                addressHandler(addresses[idx], label);
                break;
            }
        }
    }
    // TO DO: Add a label to bottom of this form for title of waypoint when saving.
    return(

        <Modal animation={false} show={addresses.length > 0} onHide={closeForm}>
            <Modal.Header closeButton>
                <Modal.Title>Address Picker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <table className="table">
                <tbody>
                    {(addresses != null  && addresses.length > 0) &&
                        addresses.map((address,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <input type="radio" name="selectedAddress" defaultChecked={idx === 0} value={idx}></input>
                                    </td>
                                    <td>{address.label}</td>
                                </tr> 
                            )
                    })}
                    <tr>
                        <td>Label for this address</td>
                        <td>
                            <input id="addressLabel"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={setAddress}>
                    Save this address
                </Button>
                <Button variant="secondary" onClick={closeForm}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
 
    )
} 
export default AddressListDlg;