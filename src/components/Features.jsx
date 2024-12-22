import React from 'react';

const Features = () => {
  return (
    <div className="features-container">
      <h1 className="features-heading">Features</h1>
      <div className="features-list">
        <div className="feature">
          <h3 className="feature-title">User-Friendly Interface</h3>
          <p className="feature-description">
            Our platform features a clean and intuitive design that makes it
            easy for users to navigate and accomplish tasks efficiently.
          </p>
        </div>
        <div className="feature">
          <h3 className="feature-title">Real-Time Collaboration</h3>
          <p className="feature-description">
            Collaborate with team members in real-time, share ideas, and work
            on projects together seamlessly.
          </p>
        </div>
        <div className="feature">
          <h3 className="feature-title">Robust Security</h3>
          <p className="feature-description">
            We take security seriously, with multiple layers of protection to
            ensure your data is safe and secure.
          </p>
        </div>
        <div className="feature">
          <h3 className="feature-title">Customizable Solutions</h3>
          <p className="feature-description">
            Tailor the platform to meet your specific needs with customizable
            settings and configurations.
          </p>
        </div>
        <div className="feature">
          <h3 className="feature-title">Seamless Integration</h3>
          <p className="feature-description">
            Easily integrate with third-party applications and tools, making it
            simple to streamline your workflow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
