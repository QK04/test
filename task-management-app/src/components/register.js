import {React, useState} from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../css/register.css';

function Register(){
    const[email, setEmail] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[re_password, setRePassword] = useState("");
    const[error, setError] = useState("");
    const [success, setSuccess] = useState(false);

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
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                navigate("/login")
            }, 3000);
        } catch (e){
            setError(e.message);
        }
    }
    return (
        <div className='register-page'>
            <div className='register-container'>            
                <div className="header">
                    <img
                    src="/Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi.png"
                    alt="Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi"
                    />
                </div>
                <div className="register-container-form">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input 
                            type="email" 
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
                                Already have an account? <Link to="/login">Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>

            {success && (
                <div className="success-pop-up">
                    <p>You have successfully registered!</p>
                </div>
            )}
        </div>
    );
};

export default Register;