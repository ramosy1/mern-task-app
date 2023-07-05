import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import heroCover from '../images/ToDoApp_Hero.png';

const HomePage = () => {
    return (
        <div className='hero-section' id='hero'>
            <div className='hero-container'>
                <div className='hero-content-container'>
                    <h1>Boost Your Productivity and Stay Organized with our Mobile Todo App</h1>
                    <p>Whether you're at home, at work, or on the go, your tasks are always within reach, enhancing convenience and ensuring you never miss a beat. Get started now!</p>
                        <div className='hero-btn-container'>
                            <div className='hero-btn'>
                                <span><Link to="/login"> Login</Link></span>
                                <span><Link to="/signup"> Sign up</Link></span>
                            </div>
                        </div>
                </div>
                <div className='coach-image-container'>
                    <img src={heroCover} alt='To Do App' />
                </div>
            </div>
        </div>
    );
};

export default HomePage;