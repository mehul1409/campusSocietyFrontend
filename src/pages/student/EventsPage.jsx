import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventsPage.css';


const EventsPage = () => {
  const { coordinatorId } = useParams();
  const [hubDetails, setHubDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const token = localStorage.getItem('studentauthorize');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [hubResponse, eventsResponse] = await Promise.all([
          fetch('https://campussociety.onrender.com/api/getAllHubs', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
              "studentauthorize": token,
            },
          }),
          fetch('https://campussociety.onrender.com/api/getAllEvents', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ coordinatorId }),
          }),
        ]);

        if (!hubResponse.ok) {
          throw new Error('Failed to fetch hub details.');
        }
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events.');
        }

        const hubData = await hubResponse.json();
        const matchingHub = hubData.find((hub) => hub.coordinatorId._id === coordinatorId);
        setHubDetails(matchingHub);

        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
        console.log(eventsData)
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coordinatorId, token]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  const renderDescriptionWithNewLines = (description) => {
    const formattedDescription = description.replace(/\r?\n/g, '<br />');
    return { __html: formattedDescription };
  };
  
  return (
    <div className="events-page">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="hub-header">
            <div className="hub-details">
              <h1>{hubDetails?.hubName || 'Hub Name'}</h1>
              <p><strong>Coordinator Name:</strong> {hubDetails?.coordinatorId.name || 'N/A'}</p>
            </div>
          </div>
          <h2>EVENTS</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {events.length > 0 ? (
            <ul className="events-list">
            {events.map((event) => (
              <li
                key={event._id}
                className="event-card"
                onClick={() => {navigate(`/event/${event._id}`);window.scrollTo(0, 0);}}
              >
                <img className="hub-image" src={event.eventDetails.photo || '/event.png'} alt="Event" />
                <div className="event-details-overlay">
                  <h3>{event.eventDetails.title}</h3>
                  {/* <p>{truncateText(event.eventDetails.description, 50)}</p> */}
                  <p><strong>Date:</strong> {new Date(event.eventDetails.date).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
          
          ) : (
            <p>No events available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default EventsPage;
