import React, { useState } from 'react';
import { NavLink, Link, useNavigate} from 'react-router-dom';
import '../css/login.css';

function Login(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            navigate("/home")
        } catch(e){
            console.log("There is some unexpected error happened", e);
        }
    };

    return (
        <div className='login-page'>
            <div className='login-container'>
                <div className="header">
                    <img
                    src="/Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi.png"
                    alt="Logo Truong Dai hoc Khoa hoc va Cong nghe Ha Noi"
                    />
                </div>
                <div className="logo">
                    <span className="logo-text">Task Management</span>
                </div>
                <div className="login-container-form">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required="" 
                        placeholder='Username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required="" 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" defaultValue="Login" />
                    </form>
                    <div className="footer">
                            Forgot password? <Link to="/forgot-password">Click here</Link>
                    </div>
                    <div className="register">
                            Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
            </div>
    );
};

export default Login;
