import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateHub.css';

const UpdateHub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hub } = location.state;

  const [hubDetails, setHubDetails] = useState({
    hubName: hub.hubName,
    collegeId: hub.collegeId._id,
    coordinatorId: hub.coordinatorId._id,
    coordinatorName: hub.coordinatorId.name,
  });

  const [responseMessage, setResponseMessage] = useState(null);


  useEffect(() => {
    const storedDetails = localStorage.getItem('spocdetails');
    if (!storedDetails) {
      window.location.href = '/';
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setHubDetails({ ...hubDetails, [name]: value });
  };

  const token = localStorage.getItem("spocauthorize");
  console.log(hubDetails)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8003/api/${hub._id}/hubupdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          spocauthorize: token,
        },
        body: JSON.stringify(hubDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update hub.");
      }

      setResponseMessage({
        type: "success",
        message: "Hub updated successfully!",
      });

      setTimeout(() => navigate("/spoc-dashboard"), 2000);
    } catch (err) {
      setResponseMessage({
        type: "error",
        message: err.message || "An error occurred while updating the hub.",
      });
    }
  };

  return (
    <div>
      <h1 className="update-hub-title">Update Hub</h1>
      {responseMessage && (
        <div
          className={`response-message ${responseMessage.type === "success" ? "success-message" : "error-message"
            }`}
        >
          {responseMessage.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="update-hub-form">
        <div className="form-group">
          <label htmlFor="hubName">Hub Name:</label>
          <input
            type="text"
            id="hubName"
            name="hubName"
            value={hubDetails.hubName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="coordinatorName">Coordinator Name:</label>
          <input
            type="text"
            id="coordinatorName"
            name="coordinatorName"
            value={hubDetails.coordinatorName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Update Hub
        </button>
      </form>

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

export default UpdateHub;
