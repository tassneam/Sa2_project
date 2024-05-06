import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './CreateWarehouseForm.module.css';
import api, { createWarehouse } from "../../api";

export const CreateWarehouseForm = () => {
    const history = useHistory();
    const [inputs, setInputs] = useState({
        userId: localStorage.getItem("userId") || '',
        name: '',
        location: '',
        status: '',
        capacity: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.createWarehouse(inputs);
            if (response.data && response.data.status) {
                console.log('Warehouse creation success:', response.data.message);
                // Redirect to desired page after successful warehouse creation
                history.push(`/products`);
            } else {
                throw new Error(response.data.message || 'Failed to create warehouse');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during warehouse creation.');
            console.error('Warehouse creation error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
            <label className={classes.label}>
                <span className={classes.labelText}>userId:</span>
                <input
                    className={classes.input}
                    type="number"
                    name="userId"
                    value={inputs.userId}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Name:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="name"
                    value={inputs.name}
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
                    value={inputs.location}
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
                    value={inputs.status}
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
                    value={inputs.capacity}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <input className={classes.submit} type="submit" value="Create Warehouse"/>
            {error && <p className={classes.errorMsg}>{error}</p>}
            {isLoading && <p>Loading...</p>}
        </form>
    );
};
