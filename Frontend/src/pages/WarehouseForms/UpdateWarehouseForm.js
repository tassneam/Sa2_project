import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classes from './CreateWarehouseForm.module.css';
import api from "../../api";

export const UpdateWarehouseForm = () => {
    const history = useHistory();
    const { id } = useParams(); // Get warehouse ID from URL params
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch warehouse details when component mounts
        console.log(id)
        getWarehouseDetails();
    }, []);

    const getWarehouseDetails = async () => {
        try {
            const response = await api.getWarehouseById(id);
            setInputs(response.data);
        } catch (error) {
            console.error("Error fetching warehouse details:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.updateWarehouse( inputs);
            if (response.data && response.data.status) {
                console.log('Warehouse update success:', response.data.message);
                // Redirect to desired page after successful warehouse update
                history.push('/products');
            } else {
                throw new Error(response.data.message || 'Failed to update warehouse');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during warehouse update.');
            console.error('Warehouse update error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
            <label className={classes.label}>
                <span className={classes.labelText}>Name:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="name"
                    value={inputs.name || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Location:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="location"
                    value={inputs.location || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Status:</span>
                <select
                    className={classes.input}
                    name="status"
                    value={inputs.status || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Capacity:</span>
                <input
                    className={classes.input}
                    type="number"
                    name="capacity"
                    value={inputs.capacity || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>User ID:</span>
                <input
                    className={classes.input}
                    type="number"
                    name="userId"
                    value={inputs.userId || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>

            <input className={classes.submit} type="submit" value="Update Warehouse"/>
            {error && <p className={classes.errorMsg}>{error}</p>}
            {isLoading && <p>Loading...</p>}
        </form>
    );
};
