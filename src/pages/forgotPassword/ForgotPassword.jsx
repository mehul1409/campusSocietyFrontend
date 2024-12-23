import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);

    const handleRoleSelection = (e) => {
        setRole(e.target.value);
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = '';
        if (role === 'student') {
            endpoint = 'https://campussociety.onrender.com/student/forgotPassword';
        } else if (role === 'spoc') {
            endpoint = 'https://campussociety.onrender.com/spoc/forgotPassword';
        } else if (role === 'coordinator') {
            endpoint = 'https://campussociety.onrender.com/coordinator/forgotPassword';
        }

        console.log(`Sending password reset request to ${endpoint} for email: ${email}`);

        try {
            const response = await axios.post(endpoint, { email, role });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            setMessage(`Password reset link sent to ${email}`);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'An error occurred');
        } finally {
            setEmail('');
            setTimeout(() => {
                setMessage('');
            }, 2000);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password?</h2>

            {step === 1 && (
                <>
                    <p>Please select your role:</p>
                    <form>
                        <div className="role-selection">
                            <div className="labeldiv">
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        onChange={handleRoleSelection}
                                        required
                                    />
                                    Student
                                </label>
                            </div>
                            <div className="labeldiv">
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="spoc"
                                        onChange={handleRoleSelection}
                                        required
                                    />
                                    SPOC
                                </label>
                            </div>
                            <div className="labeldiv">
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="coordinator"
                                        onChange={handleRoleSelection}
                                        required
                                    />
                                    Coordinator
                                </label>
                            </div>
                        </div>
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
                </>
            )}

            {step === 2 && (
                <>
                    <div className="para">
                        <p>Enter your email address below and we'll send you a link to reset your password.</p>
                    </div>

                    {message && <p className="message">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>

                        <button type="submit" className="submit-btn">Send Reset Link</button>
                    </form>

                    <div className="back-to-login">
                        <div>Remember your password?</div>
                        <div><Link to="/login">Back to Login</Link></div>
                    </div>
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
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
