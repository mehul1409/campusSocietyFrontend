import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Spocdashboard.css"; // Import the CSS file

const Spocdashboard = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all hubs from the API
  const token = localStorage.getItem("spocauthorize");
  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const response = await fetch("http://localhost:3000/spoc/getAllHubs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
            spocauthorize: token,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch hubs.");
        }

        const data = await response.json();
        setHubs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHubs();
  }, []);

  // Handle delete hub
  const handleDelete = async (hubId) => {
    try {
      const response = await fetch(`http://localhost:3000/spoc/${hubId}/hubdelete`, {
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

  // Navigate to the update page
  const handleUpdate = (hub) => {
    navigate(`/update-hub/${hub._id}`, { state: { hub } });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="spoc-dashboard">
      <h1>SPOC Dashboard</h1>
      <button className="add-button">
        <Link to="/addcoordinator">Add Hub</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>Hub Name</th>
            <th>College</th>
            <th>Coordinator</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hubs.map((hub) => (
            <tr key={hub._id}>
              <td>{hub.hubName}</td>
              <td>{hub.collegeId.collegeName}</td>
              <td>{hub.coordinatorId.name}</td>
              <td>
                <button className="update-button" onClick={() => handleUpdate(hub)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => handleDelete(hub._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spocdashboard;
