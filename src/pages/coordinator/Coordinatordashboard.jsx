import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoordinatorCard from '../../components/userCardComponet/Card';
import imageSrc from '/mehulBansal.jpeg';
import './Coordinatordashboards.css'

const CoordinatorDashboard = () => {
  const [coordinatorDetails, setCoordinatorDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = localStorage.getItem('coordinatordetails');
    if (storedDetails) {
      setCoordinatorDetails(JSON.parse(storedDetails));
    } else {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (coordinatorDetails) {
        try {
          const response = await fetch('https://campussociety.onrender.com/coordinator/eventsByCoordinator', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'coordinatorauthorize': localStorage.getItem('coordinatorauthorize'),
            },
            body: JSON.stringify({ coordinatorId: coordinatorDetails.coordinator._id }),
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.statusText}`);
          }

          const data = await response.json();
          console.log(data);
          setEvents(data);
        } catch (error) {
          setErrorMessage('Error fetching events. Please try again later.');
          setTimeout(()=>{setErrorMessage('')},2000);
          console.error('Error fetching events:', error);
        }
      }
    };

    fetchEvents();
  }, [coordinatorDetails]);

  const handlePostEvent = () => {
    navigate('/post-event');
  };

  const handleEdit = async (eventId) => {
    try {
      navigate(`/edit-event/${eventId}`);
    } catch (error) {
      setErrorMessage('Error navigating to edit event. Please try again.');
      console.error('Error editing event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch('https://campussociety.onrender.com/coordinator/deleteEvent', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'coordinatorauthorize': localStorage.getItem('coordinatorauthorize'),
        },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setTimeout(() => setSuccessMessage(''), 3000);

      setEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId));
    } catch (error) {
      setErrorMessage('Error deleting event. Please try again.');
      console.error('Error deleting event:', error);
    }
  };

  if (!coordinatorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Coordinator Dashboard</h1>
      <hr />
      <CoordinatorCard
        name={coordinatorDetails.coordinator.name}
        hubName={coordinatorDetails.coordinator.hubId.hubName}
        email={coordinatorDetails.coordinator.email}
        college={coordinatorDetails.coordinator.collegeId.collegeName}
        imageSrc={imageSrc}
        collegeLocation={coordinatorDetails.coordinator.collegeId.location}
      />
      <button className="post-event-button post-event-button-coordinator" onClick={handlePostEvent}>Post New Event</button>
      <hr />

      <h2>My Events</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {events.length > 0 ? (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <h3>{event.eventDetails.title}</h3>
              <p>{event.eventDetails.description}</p>
              <div className="event-actions">
                <div>
                  <p className='date'>Date: {new Date(event.eventDetails.date).toLocaleDateString()}</p>
                </div>
                <div className='editDelete'>
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
  );
};

export default CoordinatorDashboard;
