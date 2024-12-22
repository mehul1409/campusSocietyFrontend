import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Spocdashboard.css";

const Spocdashboard = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("spocauthorize");
  const spocDetailsString = localStorage.getItem("spocdetails");
  const spocDetails = JSON.parse(spocDetailsString);
  const name = spocDetails.spoc.name
  const email = spocDetails.spoc.email
  const spocCollegeId = spocDetails.spoc.collegeId; 

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const response = await fetch("http://localhost:8003/api/getAllHubs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
            "spocauthorize": token,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch hubs.");
        }

        const data = await response.json();
        console.log(data)
        setHubs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHubs();
  }, [token]);

  const handleDelete = async (hubId) => {
    try {
      const response = await fetch(`http://localhost:8003/api/${hubId}/hubdelete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete hub.");
      }

      alert("Hub deleted successfully!");
      setHubs((prevHubs) => prevHubs.filter((hub) => hub._id !== hubId));
    } catch (err) {
      alert(err.message || "An error occurred while deleting the hub.");
    }
  };

  const handleUpdate = (hub) => {
    navigate(`/update-hub/${hub._id}`, { state: { hub } });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const filteredHubs = hubs.filter((hub) => hub.collegeId._id === spocCollegeId);

  return (
    <div className="spoc-dashboard">
      <h1>SPOC Dashboard</h1>
      {filteredHubs.length > 0 && (
        <>
          <hr />
          <div className="spoc-info">
            <p>
              <strong>Name:</strong> {name || "Unknown"}
            </p>
            <p>
              <strong>Email:</strong> {email || "Unknown"}
            </p>
            <p>
              <strong>College:</strong> {filteredHubs[0].collegeId?.collegeName || "Unknown"}
            </p>
          </div>
        </>
      )}

      <button className="add-button">
        <Link to="/addcoordinator">Add New Hub</Link>
      </button>

      <div className="hubs-list">
        {filteredHubs.map((hub) => (
          <div key={hub._id} className="hub-card">
            <h2>{hub.hubName}</h2>
            <p>
              <strong>Coordinator Name:</strong>{" "}
              {hub.coordinatorId ? hub.coordinatorId.name : "No coordinator"}
            </p>
            <p>
              <strong>Coordinator Email:</strong>{" "}
              {hub.coordinatorId ? hub.coordinatorId.email : "No coordinator"}
            </p>

            <div className="hub-actions">
              <button className="update-button" onClick={() => handleUpdate(hub)}>
                Update
              </button>
              <button className="delete-button" onClick={() => handleDelete(hub._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spocdashboard;
