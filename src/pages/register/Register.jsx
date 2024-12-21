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
  const navigate = useNavigate();

  // Fetch colleges from the API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:8003/api/getAllColleges', {
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

    try {
      const response = await axios.post('http://localhost:8003/student/register', formData);

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
    }
  };

  return (
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
        Already have an account? Log in
      </button>
    </div>
  );
};

export default Register;
