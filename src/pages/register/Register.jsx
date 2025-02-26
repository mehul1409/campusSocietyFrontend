import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collegeId: '',
    otp: '',
  });
  const [colleges, setColleges] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('https://campussociety.onrender.com/api/getAllColleges', {
          headers: { 'Content-Type': 'application/json', 'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1' },
        });
        setColleges(response.data);
      } catch (err) {
        setError('Failed to load colleges. Please try again later.');
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setMessage('');

    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@mail\.jiit\.ac\.in$/;
    if (!emailRegex.test(formData.email)) {
      setError("Register with GSUIT Id only.");
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.collegeId) {
      setError('All fields are required.');
      return;
    }

    const allValid = Object.values(passwordValidation).every(Boolean);
    if (!allValid) {
      setError('Password does not meet requirements.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://campussociety.onrender.com/api/sendOtp', {
        email: formData.email,
      });

      if (response.status === 200) {
        setMessage('OTP sent to your email. Please enter OTP to complete registration.');
        setOtpSent(true);
      } else {
        setError(response.data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      if(err.response){
        setError(err.response.data.message);
      }
      else{
      setError('Error sending OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    if (!formData.otp) {
      setError('Please enter the OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://campussociety.onrender.com/api/verifyOtp', {
        email: formData.email,
        otp: formData.otp,
      });

      console.log(response)


      console.log(formData.otp);

      if (response.status == 200) {
        setMessage('OTP verified successfully. Completing registration...');

  

        // Proceed to register the user
        const registerResponse = await axios.post('https://campussociety.onrender.com/student/register', formData);

        if (registerResponse.status == 201) {
          setMessage('Registration successful! Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(registerResponse.data.message);
        }
      } else {
        setError(response.data.message || 'Invalid OTP.');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div className="register-container">
      <div className="register-page">
        <h2>Register</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {/* Password Validation */}
          <div className="password-rules">
            <p className={passwordValidation.length ? 'valid' : 'invalid'}>{passwordValidation.length ? '✔' : '✖'} At least 8 characters</p>
            <p className={passwordValidation.uppercase ? 'valid' : 'invalid'}>{passwordValidation.uppercase ? '✔' : '✖'} One uppercase letter</p>
            <p className={passwordValidation.lowercase ? 'valid' : 'invalid'}>{passwordValidation.lowercase ? '✔' : '✖'} One lowercase letter</p>
            <p className={passwordValidation.number ? 'valid' : 'invalid'}>{passwordValidation.number ? '✔' : '✖'} One number</p>
            <p className={passwordValidation.specialChar ? 'valid' : 'invalid'}>{passwordValidation.specialChar ? '✔' : '✖'} One special character (@$!%*?&)</p>
          </div>

          <div>
            <label htmlFor="college">College:</label>
            <select id="college" name="collegeId" value={formData.collegeId} onChange={handleChange} required>
              <option value="">Select College</option>
              {colleges.map(college => <option key={college._id} value={college._id}>{college.collegeName}</option>)}
            </select>
          </div>

          {!otpSent ? (
            <button type="submit">Register</button>
          ) : (
            <>
              <div>
                <label htmlFor="otp">Enter OTP:</label>
                <input id="otp" type="text" name="otp" value={formData.otp} onChange={handleChange} required />
              </div>
              <button type="submit" onClick={verifyOtpAndRegister}>Verify OTP</button>
            </>
          )}
        </form>

        <button className="already-account-btn" onClick={() => navigate('/login')}>
        Already have an account?
      </button>
      </div>
    </div>
  );
};

export default Register;
