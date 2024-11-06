import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault(); 
        if(username === 'admin@gmail.com' && password === 'admin12345'){
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/home');
        }
    }

    return (
        <>
            <h2 className='title'>Employee Management System</h2> 
            <div className='login-Container'>
                <h1>Login Page</h1>
                <form onSubmit={submitHandler}>
                    <div className='login-input-div'>
                        <input required type='text' placeholder='Enter the userName' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='login-input-div'>
                        <input required type='password' placeholder='Enter the password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='login-button-div'>
                        <button className='login-button' type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
