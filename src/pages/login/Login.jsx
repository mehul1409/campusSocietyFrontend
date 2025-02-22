import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Email and Password are required");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@mail\.jiit\.ac\.in$/;
    if (!emailRegex.test(formData.email)) {
      setError("Login with GSUIT Id only");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const loginEndpoint = getLoginEndpoint(formData.role);

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message}`);
      }


      const Details  = data;
      const userDetails = JSON.stringify(Details)
      
      setTokenAndRole(formData.role, data.token, data.role, userDetails);
      navigateToRolePage(formData.role);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setTokenAndRole = (role, token, userrole, details) => {
    const storageKey = `${role}authorize`;
    const userdetails = `${role}details`;
    localStorage.setItem(userdetails, details);
    localStorage.setItem(storageKey, token);
    localStorage.setItem('role', userrole);
  };

  const getLoginEndpoint = (role) => {
    const endpoints = {
      spoc: 'https://campussociety.onrender.com/spoc/login',
      coordinator: 'https://campussociety.onrender.com/coordinator/login',
      student: 'https://campussociety.onrender.com/student/login',
    };
    return endpoints[role] || endpoints.student;
  };

  const navigateToRolePage = (role) => {
    const routes = {
      spoc: '/spoc-dashboard',
      coordinator: '/coordinator-dashboard',
      student: '/student-dashboard',
    };
    navigate(routes[role] || routes.student);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Login as:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="spoc">SPOC</option>
            <option value="coordinator">Coordinator</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="additional-links">
        <button onClick={() => navigate('/register')} className="secondary-button">
          Don't have an account?
        </button>
        <button onClick={() => navigate('/forgot-password')} className="secondary-button">
          Forgot Password?
        </button>
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
    </div>
  );
};

export default Login;