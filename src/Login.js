import React, { useState } from "react";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <h2>Welcome to Ripipsa!</h2>
                <form action = "">
                    <div className="input-group">
                        <label htmlFor = "username">Username</label>
                        <input type = "username" name="username" placeholder='Enter username'/>
                    </div>
                </form>
                <form action = "">
                    <div className="input-group">
                        <label htmlFor = "password">Password</label>
                        <input type = "password" name="password" placeholder='Enter password'/>
                    </div>
                    <Link to ="/home">
                        <button type="button" className="login-button">LOGIN</button>
                    </Link>
                    <p></p>
                    <div className="links">
                        <a href="#forgot">Forgot Password?</a>
                        {/* <a href="#register">New? Register Here</a> */}
                        <Link to = "/register" href="#register">New? Register Here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;