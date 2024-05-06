import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {

  return (
    <div className="login-container">
            <div className="login-form">
                <h1>Register</h1>
                <form action = "">
                    <div className="input-group">
                        <label htmlFor = "username">Username</label>
                        <input type = "username" name='username' placeholder='Enter username'/>
                    </div>
                </form>
                <form action = "">
                    <div className="input-group">
                        <label htmlFor = "password">Password</label>
                        <input type = "password" name='password' placeholder='Enter password'/>
                    </div>
                    <button type="button" className="login-button">REGISTER</button>
                    <p></p>
                    <div className="links">
                        <Link to = "/" href="#login">You have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
  )
};

export default Signup;