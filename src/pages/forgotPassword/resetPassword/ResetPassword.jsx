import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const token = searchParams.get('token');
    const role = searchParams.get('role');

    let endpoint = '';
    if (role === 'student') {
        endpoint = 'https://campussociety.onrender.com/student/resetPassword';
    } else if (role === 'spoc') {
        endpoint = 'https://campussociety.onrender.com/spoc/resetPassword';
    } else if (role === 'coordinator') {
        endpoint = 'https://campussociety.onrender.com/coordinator/resetPassword';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(endpoint, {
                token,
                newPassword,
            });

            setSuccessMessage(response.data.message);
            setError('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Enter your new password"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your new password"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Reset Password
                </button>
            </form>
            <hr />
            <div className="mainLogoImage">
                <div className="aboveimage">
                    "Join the Campus Society — Connect, Collaborate, and Grow Together!"
                </div>
                <img src="/mainLogo.png" alt="" />
                <div className="belowimage">
                    "Proudly developed for the Campus Community with passion and dedication."
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
