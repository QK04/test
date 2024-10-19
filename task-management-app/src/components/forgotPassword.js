import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/forgotPassword.css"

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    const handleForgotPwd = async function (e) {
        e.preventDefault();
        
        if (!email) {
            setError("Field is required");
            return;
        }

        try {
            setSuccess(true);
            
            setTimeout(() => {
                setSuccess(false);
                navigate("/login");
            }, 2000); 
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="forgot-page">
            <div className="header">
                <img
                src="/Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi.png"
                alt="Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi"
                />
            </div>
            <div className="container">
                <Link to="/login" className="return-btn"> 
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#007bff"
                    >
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
                </Link>
                <h2>Forgot Password?</h2>
                <p>
                Enter your email address, and we'll send you a link to reset your
                password.
                </p>
                <form onSubmit={handleForgotPwd}>
                    <div className="form-group">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        required=""
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit">Send Reset Link</button>
                </form>
                <div className="pagination">
                    <Link to="/forgot-password" className="page-btn">
                        1
                    </Link>
                </div>
            </div>
            {success && (
            <div className="success-pop-up">
                <p>You have successfully send request to your Email!</p>
            </div>
            )}
        </div>

    );
};

export default ForgotPassword;