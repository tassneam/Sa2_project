import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Login.module.css';
import api from '../api';

export const Login = ({ setIsAuthenticated }) => {
    const history = useHistory();
    const [inputs, setInputs] = useState({});
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
            const response = await api.loginUser(inputs);
            if (response.data && response.data.status) {
                console.log('Login success:', response.data.message);
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('userId', response.data.userId);  // Assuming your response has userId
                setIsAuthenticated(true);
                history.push('/products');
            } else {
                throw new Error(response.data.message || 'Authentication failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterClick = () => {
        history.push('/register');
    };

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
            <label className={classes.label}>
                <span className={classes.labelText}>Email:</span>
                <input
                    className={classes.input}
                    type="email"
                    name="email"
                    value={inputs.email || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <label className={classes.label}>
                <span className={classes.labelText}>Password:</span>
                <input
                    className={classes.input}
                    type="password"
                    name="password"
                    value={inputs.password || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
            </label>
            <input className={classes.submit} type="submit" value="Log In"/>
            <button className={classes.submit} type="button" onClick={handleRegisterClick}>
                Register
            </button>
            {error && <p className={classes.errorMsg}>{error}</p>}
            {isLoading && <p>Loading...</p>}
        </form>
    );
};
