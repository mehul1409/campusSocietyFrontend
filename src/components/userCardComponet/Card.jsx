import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ name, hubName, email, college, imageSrc }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const removeCredentials = (role) => {
    const details = `${role}details`;
    const authorize = `${role}authorize`;
    localStorage.removeItem(details);
    localStorage.removeItem('role');
    localStorage.removeItem(authorize);
  }

  const endpointLogout = (role) => {
    if (role === 'coordinator') {
      return 'http://localhost:8003/coordinator/logout';
    } else if (role === 'student') {
      return 'http://localhost:8002/student/logout';
    } else if (role === 'spoc') {
      return 'http://localhost:8001/spoc/logout';
    }
  }

  const handleLogout = async () => {
    try {
      const role = localStorage.getItem('role');

      const response = await fetch(endpointLogout(role), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      removeCredentials(role);

      window.location.href = '/';

    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed, please try again later.");
    }
  };
  const handleChangePasswordClick = () => {
    navigate("/changepassword", { state: { email } });
  };

  return (
    <div className="coordinator-card">
      <div className="details">
        <div className="card-details">
          <h3>{name}</h3>
          <p><strong>College:</strong> {college}</p>
          <p><strong>Hub:</strong> {hubName}</p>
        </div>
        <div className="card-image" onClick={togglePopup}>
          <img src={imageSrc} alt="Coordinator" />
        </div>
      </div>
      <div className="emaildetail">
        <p><strong>Email:</strong> {email}</p>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleChangePasswordClick}>Change Password</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;