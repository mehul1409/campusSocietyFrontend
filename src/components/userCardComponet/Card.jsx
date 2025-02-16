import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ name, hubName, spocName, email, college, imageSrc, collegeLocation }) => {
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
  };

  const endpointLogout = (role) => {
    if (role === 'coordinator') {
      return 'https://campussociety.onrender.com/coordinator/logout';
    } else if (role === 'student') {
      return 'https://campussociety.onrender.com/student/logout';
    } else if (role === 'spoc') {
      return 'https://campussociety.onrender.com/spoc/logout';
    }
  };

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

  const role = localStorage.getItem('role');
  var displayRoleField;
  var displayRoleLabel;

  if (role === 'coordinator') {
    displayRoleField = hubName;
    displayRoleLabel = 'HUB';
  } else if (role === 'student') {
    displayRoleField = spocName;
    displayRoleLabel = 'SPOC';
  }

  return (
    <div className="coordinator-card">
      <div className="card-header"></div>
  <div className="card-image">
    <img src={imageSrc} alt="Profile" />
  </div>
      <div className="details">
        <div className="card-details">
          <h3 className="username">{name}</h3>
          {
            role !== 'spoc' && (
              <p><strong>{displayRoleLabel}:</strong> {displayRoleField}</p>
            )
          }

          <p><strong>College:</strong> {college}</p>
          <p><strong>COLLEGE LOCATION:</strong> {collegeLocation}</p>
        </div>
        <div className="card-image" onClick={togglePopup}>
          <img src={imageSrc} alt="Coordinator" />
        </div>
      </div>
      {/* <div className="emaildetail">
        <p><strong>EMAIL:</strong> {email}</p>
      </div> */}

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
