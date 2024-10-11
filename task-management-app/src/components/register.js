import {React, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/register.css';

function Register(){
    const[email, setEmail] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[re_password, setRePassword] = useState("");
    const[error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()
        if(password !== re_password){
            setError("Password do not match");
            return;
        }

        if(!email || !username || !password) {
            setError("All fields are required");
            return;
        }

        try{
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        } catch (e){
            setError(e.message);
        }
    }
    return (
        <div className='container'>            
            <div className="header">
                <img
                src="/Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi.png"
                alt="Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi"
                />
            </div>
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        required="" 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
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
                    <div className="form-group">
                        <input 
                        type="password" 
                        id="re-password" 
                        name="re-password" 
                        required="" 
                        placeholder='Re-enter your password'
                        value={re_password}
                        onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" defaultValue="Register" />
                    <div className="register">
                            Already have an account? <NavLink to="/login">Sign in</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;