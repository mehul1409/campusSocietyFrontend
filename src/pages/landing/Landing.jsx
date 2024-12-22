import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Campus Society</h1>
          <div className='paradiv'>
            <p>Your hub for managing college activities in an eco-friendly way.</p>
            <p>Join a community of students, coordinators, and SPOCs working towards a sustainable future!</p>
          </div>
          <button className="cta-button">
            <Link to='/login'>Get Started</Link>
          </button>
          <button className="learn-more-button">
            <Link to='/about'>Learn More</Link>
          </button>
        </div>
      </div>

      <main className="main-content">
        <section id="about" className="about-section">
          <h2>About Campus Society</h2>
          <p>
            Campus Society is your one-stop platform to manage college hubs and coordinators.
            We empower SPOCs to streamline activities while ensuring seamless communication between coordinators and students.
            With our eco-friendly approach, we make managing college hubs more sustainable, digital, and efficient.
          </p>
          <p>
            Our mission is to reduce paper waste, optimize energy usage, and foster green initiatives across campuses.
          </p>
          <div className='aboutSectionButton'>
          <button className="cta-button">
            <Link to='/login'>Join Us Now</Link>
          </button>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Eco-Friendly Features</h2>
          <div className="features-list">
            <div className="feature">
              <h3>Paperless System</h3>
              <p>Say goodbye to paper! Our platform is completely digital, reducing waste and making your tasks more efficient.</p>
            </div>
            <div className="feature">
              <h3>Energy-Efficient</h3>
              <p>We've optimized our servers and infrastructure to consume less energy, reducing the carbon footprint of our operations.</p>
            </div>
            <div className="feature">
              <h3>Community Collaboration</h3>
              <p>Engage in eco-conscious initiatives and promote sustainability in your community through our platform.</p>
            </div>
          </div>
          <div className="aboutSectionButton">
          <button className="cta-button">
            <Link to='/features'>Explore Features</Link>
          </button>
          </div>
        </section>

        <section id="shoutout" className="shoutout-section">
          <h2>Contact Us</h2>
          <p>
            Got questions? We're here to help! Reach out to us at <strong>mehulbansalswm1234@gmail.com</strong> or
            call us at <strong>+918595139817</strong>.
          </p>
          <p>We value your feedback and suggestions to make the platform better and greener!</p>
          <div className="aboutSectionButton">
          <button className="cta-button">
            <Link to='/contact'>Contact Us</Link>
          </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
