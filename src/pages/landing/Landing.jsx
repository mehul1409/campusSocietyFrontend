import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const navigateToRolePage = (role) => {
    const roleMapping = {
      spoc: '/spoc-dashboard',
      coordinator: '/coordinator-dashboard',
      student: '/student-dashboard',
    };
  
    return roleMapping[role];
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      const redirectTo = navigateToRolePage(role);
      navigate(redirectTo);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="landing-page">
      <main className="main-content">
        <section id="about" className="about-section">
          <h2>About Campus Society</h2>
          <p>
            Campus Society is your one-stop platform to manage college hubs and coordinators. 
            With streamlined features, we empower SPOCs to manage activities effectively while ensuring 
            seamless communication between coordinators and students.
          </p>
        </section>

        <section id="shoutout" className="shoutout-section">
          <h2>Contact Us</h2>
          <p>
            Got questions? Feel free to reach out at <strong>contact@campussociety.com</strong> or 
            call us at <strong>+91-123-456-7890</strong>.
          </p>
        </section>
      </main>     
    </div>
  );
};

export default Landing;
