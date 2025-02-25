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
  });
  const [colleges, setColleges] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch colleges from the API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('https://campussociety.onrender.com/api/getAllColleges', {
          headers: {
            'Content-Type': 'application/json',
            'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          },
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@mail\.jiit\.ac\.in$/;
    if (!emailRegex.test(formData.email)) {
      setError("Register with GSUIT Id only");
      return false;
    }

    if (!formData.name) {
      setError('Name is required.');
      return;
    }
    if (!formData.email) {
      setError('Email is required.');
      return;
    }
    if (!formData.password) {
      setError('Password is required.');
      return;
    }
    if (!formData.collegeId) {
      setError('Please select a college.');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('https://campussociety.onrender.com/student/register', formData);

      if (response.status === 201) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(`${response.data.message}`);
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally{
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className='register-container'>
    <div className="register-page">
      <h2>Register</h2>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="college">College:</label>
          <select
            id="college"
            name="collegeId"
            value={formData.collegeId}
            onChange={handleChange}
            required
          >
            <option value="">Select College</option>
            {colleges.map((college) => (
              <option key={college._id} value={college._id}>
                {college.collegeName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>

      <button className="already-account-btn" onClick={() => navigate('/login')}>
        Already have an account?
      </button>
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
    </div>
  );
};

export default Register;
