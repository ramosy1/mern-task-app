import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";

const Signup = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
// eslint-disable-next-line
const [_, setCookies] = useCookies(["access_token"]);
const navigate = useNavigate();

const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/auth/signup", {
            username,
            password
    });
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        alert("Registration Completed! Please login.");
        navigate("/login");
    } catch (error) {
        setError("An error occurred during signup.");
      console.error(error);
    }
};

    return (
        <div className="container-auth">
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input required type="text" id="username" autoComplete="username" placeholder="Create new username" value={ username } onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input required type="password" id="password" autoComplete="new-password" placeholder="Create new password"value={ password } onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign up</button>
                {error && <p className="error-message">{error}</p>}
                <span>Already have an account? <Link to="/login"> Login</Link></span>
                <span>or <Link to="/"> Return Home </Link></span>
            </form>
        </div>
    );
};

export default Signup;