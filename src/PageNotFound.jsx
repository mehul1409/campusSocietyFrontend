import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! Page Not Found</p>
      <p className="error-description">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="home-button">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
