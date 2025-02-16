import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoordinatorCard from '../../components/userCardComponet/Card';
import imageSrc from '/mehulBansal.jpeg';
import './Coordinatordashboards.css';

const CoordinatorDashboard = () => {
  const [coordinatorDetails, setCoordinatorDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('coordinatorauthorize');

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
      return;
    }

    const storedDetails = localStorage.getItem('coordinatordetails');
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      setCoordinatorDetails(parsedDetails);
      fetchEvents(parsedDetails.coordinator._id);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchEvents = async (coordinatorId) => {
    try {
      const response = await fetch('https://campussociety.onrender.com/coordinator/eventsByCoordinator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'coordinatorauthorize': token,
        },
        body: JSON.stringify({ coordinatorId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setErrorMessageWithTimeout('Error fetching events. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostEvent = () => navigate('/post-event');
  const handleEdit = (eventId) => navigate(`/edit-event/${eventId}`);

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch('https://campussociety.onrender.com/coordinator/deleteEvent', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'coordinatorauthorize': token,
        },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.statusText}`);
      }

      setEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId));
      setSuccessMessageWithTimeout('Event deleted successfully.');
    } catch (error) {
      setErrorMessageWithTimeout('Error deleting event. Please try again.');
    }
  };

  const setErrorMessageWithTimeout = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 2000);
  };

  const setSuccessMessageWithTimeout = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Coordinator Dashboard</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <CoordinatorCard
        name={coordinatorDetails.coordinator.name}
        hubName={coordinatorDetails.coordinator.hubId.hubName}
        email={coordinatorDetails.coordinator.email}
        college={coordinatorDetails.coordinator.collegeId.collegeName}
        imageSrc={imageSrc}
        collegeLocation={coordinatorDetails.coordinator.collegeId.location}
      />

      <button className="post-event-button" onClick={handlePostEvent}>Post New Event</button>
      <hr />

      <h2>My Events</h2>

      <div className="events-list-container">
        {events.length > 0 ? (
          <ul className="events-list">
            {events.map((event) => (
              <li key={event._id} className="event-item">
                <h3>{event.eventDetails.title}</h3>
                <p>{event.eventDetails.description}</p>
                <div className="event-actions">
                  <p className="date">Date: {new Date(event.eventDetails.date).toLocaleDateString()}</p>
                  <div className="editDelete">
                    <button onClick={() => handleEdit(event._id)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="delete-button">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
