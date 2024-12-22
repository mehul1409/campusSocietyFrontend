import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditEventPage.css'

const EditEventPage = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8003/coordinator/getEventById/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'coordinatorauthorize': localStorage.getItem('coordinatorauthorize'),
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        console.log('Fetched Event:', data);
        if (data.event) {
          setEventDetails({
            title: data.event.eventDetails.title || '',
            description: data.event.eventDetails.description || '',
            date: data.event.eventDetails.date || '',
          });
        } else {
          setErrorMessage('Event not found');
        }
      } catch (error) {
        setErrorMessage('Error fetching event details. Please try again later.');
        console.error('Error fetching event:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8003/coordinator/editEvent`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'coordinatorauthorize': localStorage.getItem('coordinatorauthorize'),
        },
        body: JSON.stringify({ eventId, eventDetails }),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setTimeout(() => navigate('/coordinator-dashboard'), 2000);
    } catch (error) {
      setErrorMessage('Error updating event. Please try again later.');
      setTimeout(() => setErrorMessage(''), 2000);
      console.error('Error editing event:', error);
    }
  };

  return (
    <div className="edit-event-container editEventContainer">
      <h1>Edit Event</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventDetails.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            rows={10}
            id="description"
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventDetails.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Event</button>
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

export default EditEventPage;

