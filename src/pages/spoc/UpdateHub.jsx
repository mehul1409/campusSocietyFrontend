import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateHub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hub } = location.state;

  const [hubDetails, setHubDetails] = useState({
    hubName: hub.hubName,
    collegeId: hub.collegeId._id,
    coordinatorId: hub.coordinatorId._id,
    events: hub.events.map((event) => event._id),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHubDetails({ ...hubDetails, [name]: value });
  };
  const token = localStorage.getItem('spocauthorize')
  const handleSubmit = async (e) => {
  e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8003/spoc/${hub._id}/hubupdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
            'spocauthorize':token,
        },
        body: JSON.stringify(hubDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update hub.");
      }

      alert("Hub updated successfully!");
      navigate("/spoc-dashboard"); // Redirect to the SPOC page
    } catch (err) {
      alert(err.message || "An error occurred while updating the hub.");
    }
  };

  return (
    <div>
      <h1>Update Hub</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Hub Name:
          <input
            type="text"
            name="hubName"
            value={hubDetails.hubName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          College ID:
          <input
            type="text"
            name="collegeId"
            value={hubDetails.collegeId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Coordinator ID:
          <input
            type="text"
            name="coordinatorId"
            value={hubDetails.coordinatorId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Events (comma-separated IDs):
          <input
            type="text"
            name="events"
            value={hubDetails.events.join(",")}
            onChange={(e) =>
              setHubDetails({ ...hubDetails, events: e.target.value.split(",") })
            }
          />
        </label>
        <br />
        <button type="submit">Update Hub</button>
      </form>
    </div>
  );
};

export default UpdateHub;
