import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory hook
import classes from './WarehouseCard.module.css';
import api from "../../api";

export const WarehouseCard = ({ details, setLatestProductAddedToCart }) => {
    const [error, setError] = useState('');
    const {  name, location, capacity } = details;
    const history = useHistory(); // Get the history object

    const updateWarehouseHandler = async () => {
        try {

            const response = await api.getWarehouseByName(name);


            history.push(`/update-warehouse/${response.data.id}`);
        } catch (err) {
            setError(err?.response?.data?.message || 'Error while updating warehouse!');
        }
    };
    const deleteWarehouseHandler = async () => {
        try {
            const response = await api.getWarehouseByName(name);
            const response2 = await api.deleteWarehouse(response.data.id);

            console.log('Warehouse deleted success:', response2.data.message);

            // Refresh the page after successful warehouse deletion
            window.location.reload();



        } catch (err) {
            setError(err.message || 'An error occurred during warehouse delete.');
            console.error('Warehouse delete error:', err);
        }
    };

    return (
        <div className={classes.card}>
            <h1>{name}</h1>
            <p className={classes.location}>
                <h3>Location: {location}</h3>
            </p>
            <h3>Capacity: {capacity}</h3>
            <button className={classes.updateWarehouse} onClick={updateWarehouseHandler}>Update Warehouse</button>
            <p></p>
            <button className={classes.updateWarehouse} onClick={deleteWarehouseHandler}>delete Warehouse</button>

            {error && <p className={classes.errorMsg}>{error}</p>}
        </div>
    )
}
