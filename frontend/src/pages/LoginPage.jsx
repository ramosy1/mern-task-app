import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";

const Login = () => {
    
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
// eslint-disable-next-line
const [_, setCookies] = useCookies(["access_token"]);
const navigate = useNavigate();

const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("https://mern-task-app-backend-t5ks.onrender.com/auth/login", {
            username,
            password
    });
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/todos");
    } catch (error) {
        setError("An error occurred during login.");
        console.error(error);
    }
};

    return (
        <div className="container-auth">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input required type="text" id="username" autoComplete="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input required type="password" id="password"  autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
                {error && <p className="error-message">{error}</p>}
                <span>Don't have an account yet? <Link to="/signup"> Sign up </Link></span>
                <span>or <Link to="/"> Return Home </Link></span>
            </form>
        </div>
    );
};

export default Login;