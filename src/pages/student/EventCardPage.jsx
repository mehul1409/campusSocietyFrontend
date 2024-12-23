import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventCardPage.css';

const EventCardPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`https://campussociety.onrender.com/api/getEventById/${eventId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setErrorMessage('Failed to fetch event details.');
        setTimeout(() => { setErrorMessage('') }, 2000);
        return;
      }
      const data = await response.json();
      console.log(data)
      setEventDetails(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setErrorMessage('An error occurred while fetching event details.');
    }
  };

  return (
    <div className="event-card-page">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {eventDetails ? (
        <div className="event-details">
          <h1>{eventDetails.event.eventDetails.title}</h1>
          <p>{eventDetails.event.eventDetails.description}</p>
          <p><strong>Date:</strong> {new Date(eventDetails.event.eventDetails.date).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventCardPage;
