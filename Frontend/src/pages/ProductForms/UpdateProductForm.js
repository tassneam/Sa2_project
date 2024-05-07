import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classes from './CreateProductForm.module.css';
import api from "../../api";

export const UpdateProductForm = () => {
    const history = useHistory();
    const { id } = useParams(); // Get warehouse ID from URL params
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch warehouse details when component mounts
        console.log(id)
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            const response = await api.getProductById(id);
            setInputs(response.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
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
            const response = await api.updateProduct( inputs);
            if (response.data && response.status) {
                console.log('Product update success:', response.data.message);
                // Redirect to desired page after successful warehouse update
                history.push('/products');
            } else {
                throw new Error(response.data.message || 'Failed to update product');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during product update.');
            console.error('Product update error:', err);
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
                <span className={classes.labelText}>Description:</span>
                <input
                    className={classes.input}
                    type="text"
                    name="description"
                    value={inputs.description || ''}
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
                    value={inputs.stock || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>

            <input className={classes.submit} type="submit" value="Update Product"/>
            {error && <p className={classes.errorMsg}>{error}</p>}
            {isLoading && <p>Loading...</p>}
        </form>
    );
};
