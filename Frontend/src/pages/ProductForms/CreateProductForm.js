import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './CreateProductForm.module.css';
import api, { createProduct } from "../../api";

export const CreateProductForm = () => {
    const history = useHistory();
    const [inputs, setInputs] = useState({
        userId: localStorage.getItem("userId") || '',
        name: '',
        description: '',
        stock: ''
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
            const response = await api.createProduct(inputs);
            if (response.data && response.status) {
                console.log('Product creation success:', response.data.message);
                history.push(`/products`);
            } else {
                throw new Error(response.data.message || 'Failed to create product');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during product creation.');
            console.error('Product creation error:', err);
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
                <span className={classes.labelText}>Description:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>


            <label className={classes.label}>
                <span className={classes.labelText}>Stock:</span>
                <input
                    className={classes.input}
                    type="number"
                    name="stock"
                    value={inputs.stock}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <input className={classes.submit} type="submit" value="Create Product"/>
            {error && <p className={classes.errorMsg}>{error}</p>}
            {isLoading && <p>Loading...</p>}
        </form>
    );
};
