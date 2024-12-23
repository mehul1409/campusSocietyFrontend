import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventsPage.css";
import imageSrc from "/mehulBansal.jpeg";

const EventsPage = () => {
  const { coordinatorId } = useParams();
  const [hubDetails, setHubDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("studentauthorize");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHubDetails();
    fetchEvents();
  }, []);

  const fetchHubDetails = async () => {
    try {
      const response = await fetch("http://localhost:8003/api/getAllHubs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          "studentauthorize": token,
        },
      });

      if (!response.ok) {
        setErrorMessage("Failed to fetch hub details.");
        return;
      }

      const hubData = await response.json();
      const matchingHub = hubData.find(
        (hub) => hub.coordinatorId._id === coordinatorId
      );
      setHubDetails(matchingHub);
    } catch (error) {
      console.error("Error fetching hub details:", error);
      setErrorMessage("An error occurred while fetching hub details.");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8003/api/getAllEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinatorId }),
      });

      if (!response.ok) {
        setErrorMessage("Failed to fetch events.");
        return;
      }

      const eventsData = await response.json();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setErrorMessage("An error occurred while fetching events.");
    }
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className="events-page">
      {/* Hub Profile Section */}
      <div className="hub-header">
        <div className="hub-profile">
          <img src={imageSrc} alt="Hub" className="hub-profile-img" />
          <div className="hub-info">
            <h1 className="hub-name">{hubDetails?.hubName || "Hub Name"}</h1>
            <p className="hub-coordinator">
              <strong>Coordinator:</strong> {hubDetails?.coordinatorId.name || "N/A"}
            </p>
            <p className="hub-email">
              <strong>Email:</strong> {hubDetails?.coordinatorId.email || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <h2 className="events-title">Events</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event) => (
            <div
              key={event._id}
              className="event-card"
              onClick={() => navigate(`/event/${event._id}`)}
            >
              <img
                src={event.eventDetails.image || imageSrc}
                alt={event.eventDetails.title}
                className="event-img"
              />
              <h3 className="event-title">{event.eventDetails.title}</h3>
              <p className="event-description">
                {truncateText(event.eventDetails.description, 100)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-events-message">No events available.</p>
      )}
    </div>
  );
};

export default EventsPage;
