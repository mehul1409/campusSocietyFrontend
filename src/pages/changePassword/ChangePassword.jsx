import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const role = localStorage.getItem('role');

    const navigateToDashboard = (role) => {
        if (role === 'coordinator') {
            return navigate('/coordinator-dashboard');
        } else if (role === 'student') {
            return navigate('/student-dashboard');
        } else if (role === 'spoc') {
            return navigate('/spoc-dashboard');
        }
    };

    const endpoint = (role) =>{
        if(role === 'coordinator'){
            return 'http://localhost:8003/coordinator/changePassword';
        }else if(role === 'student'){
            return 'http://localhost:8003/student/changePassword';
        }else if(role === 'spoc'){
            return 'http://localhost:8003/spoc/changePassword';
        }
    }

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            setErrorMessage("Unauthorized attempt detected. Please log in again.");
            setTimeout(() => {
                setErrorMessage("");
                navigate('/')
            }, 2000);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword) {
            setErrorMessage("All fields are required.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }

        try {
            const response = await fetch(endpoint(role), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'coordinatorauthorize': localStorage.getItem('coordinatorauthorize'),
                },
                body: JSON.stringify({ email, currentPassword, newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Something went wrong. Please try again later.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            } else {
                const successData = await response.json();
                setSuccessMessage(successData.message || "Password changed successfully.");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigateToDashboard(role);
                }, 3000);
            }
        } catch (error) {
            setErrorMessage("An error occurred while changing the password. Please try again later.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };
    
    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} readOnly />
                </div>
                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ChangePassword;
