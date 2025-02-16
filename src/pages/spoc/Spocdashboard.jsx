import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Spocdashboard.css";
import SpocCardComponent from '../../components/userCardComponet/Card';
import imageSrc from '/event.png';

const Spocdashboard = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [spocDetails, setSpocDetails] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem('spocdetails');
    if (storedDetails) {
      setSpocDetails(JSON.parse(storedDetails));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const token = localStorage.getItem('spocauthorize');
  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const response = await fetch("https://campussociety.onrender.com/api/getAllHubs", {
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
      const response = await fetch(`https://campussociety.onrender.com/api/${hubId}/hubdelete`, {
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

      setSuccessMessage("Hub deleted successfully!");
      setHubs((prevHubs) => prevHubs.filter((hub) => hub._id !== hubId));
    } catch (err) {
      setErrorMessage(err.message || "An error occurred while deleting the hub.");
    } finally {
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleUpdate = (hub) => {
    navigate(`/update-hub/${hub._id}`, { state: { hub } });
  };

  const spocCollegeId = spocDetails?.spoc?.collegeId?._id || "";
  const filteredHubs = hubs.filter((hub) => String(hub.collegeId._id) === String(spocCollegeId));

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <div className="spoc-error">Error: {error}</div>;

  return (
    <div className="spoc-dashboard">
      <h1 className="spoc-header">SPOC Dashboard</h1>

      {successMessage && <div className="spoc-success-message">{successMessage}</div>}
      {errorMessage && <div className="spoc-error-message">{errorMessage}</div>}

      <SpocCardComponent
        name={spocDetails?.spoc?.name}
        email={spocDetails?.spoc?.email}
        imageSrc={imageSrc}
        college={spocDetails?.spoc?.collegeId?.collegeName}
        collegeLocation={spocDetails?.spoc?.collegeId?.location}
      />

      <div className="spoc-add-button-div">
        <button className="spoc-add-button">
          <Link to="/addcoordinator">Add New Hub</Link>
        </button>
      </div>

      <div className="spoc-hubs-list">
        {
          filteredHubs.length === 0 ? (
            <p className="spoc-no-hubs-message">There is no hub related to this college.</p>
          ) : (
            filteredHubs.map((hub) => (
              <div key={hub._id} className="spoc-hub-card">
                <h2 className="spoc-hub-card-title">{hub.hubName}</h2>
                <p className="spoc-hub-card-coordinator">
                  <strong>Coordinator Name:</strong>{" "}
                  {hub.coordinatorId ? hub.coordinatorId.name : "No coordinator"}
                </p>
                <p className="spoc-hub-card-email">
                  <strong>Coordinator Email:</strong>{" "}
                  {hub.coordinatorId ? hub.coordinatorId.email : "No coordinator"}
                </p>

                <div className="spoc-hub-actions">
                  <button className="spoc-update-button" onClick={() => handleUpdate(hub)}>
                    Update
                  </button>
                  <button className="spoc-delete-button" onClick={() => handleDelete(hub._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Spocdashboard;
