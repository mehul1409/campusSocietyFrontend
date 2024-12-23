// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const EventsPage = () => {
//   const { coordinatorId } = useParams();
//   const [events, setEvents] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const token = localStorage.getItem('studentauthorize')

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   console.log(coordinatorId)

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch(`http://localhost:8003/api/getAllEvents`, {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({coordinatorId }),
//       });
//       console.log(response)

//       if (!response.ok) {
//         setErrorMessage('Failed to fetch events.');
//         return;
//       }

//       const eventsData = await response.json();
//       console.log(eventsData)
//       setEvents(eventsData);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       setErrorMessage('An error occurred while fetching events.');
//     }
//   };

//   return (
//     <div>
//       <h1>Events</h1>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       {events.length > 0 ? (
//         <ul>
//           {events.map((event) => (
//             <li key={event._id}>
//               <h3>{event.eventDetails.title}</h3>
//               <p>{event.eventDetails.description}</p>
//               <p>Date: {new Date(event.eventDetails.date).toLocaleDateString()}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No events available.</p>
//       )}
//     </div>
//   );
// };

// export default EventsPage;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventsPage.css';
import imageSrc from '/mehulBansal.jpeg';

const EventsPage = () => {
  const { coordinatorId } = useParams();
  const [hubDetails, setHubDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('studentauthorize');
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchHubDetails();
    fetchEvents();
  }, []);

  const fetchHubDetails = async () => {
    try {
      const response = await fetch('http://localhost:8003/api/getAllHubs', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          "studentauthorize": token,
        },
      });

      if (!response.ok) {
        setErrorMessage('Failed to fetch hub details.');
        return;
      }

      const hubData = await response.json();
      const matchingHub = hubData.find((hub) => hub.coordinatorId._id === coordinatorId);
      console.log(matchingHub);
      setHubDetails(matchingHub);
    } catch (error) {
      console.error('Error fetching hub details:', error);
      setErrorMessage('An error occurred while fetching hub details.');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8003/api/getAllEvents`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinatorId }),
      });

      if (!response.ok) {
        setErrorMessage('Failed to fetch events.');
        return;
      }

      const eventsData = await response.json();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      setErrorMessage('An error occurred while fetching events.');
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className="events-page">
      <div className="hub-header">
        <div className="hub-image">
          <img src={imageSrc} alt="Hub" />
        </div>
        <div className="hub-details">
          <h1>{hubDetails?.hubName || 'Hub Name'}</h1>
          <p><strong>Coordinator Name:</strong> {hubDetails?.coordinatorId.name || 'N/A'}</p>
          <p><strong>Coordinator Email:</strong> {hubDetails?.coordinatorId.email || 'N/A'}</p>
        </div>
      </div>
      <h2>Events</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {events.length > 0 ? (
        <ul className="events-list">
          {events.map((event) => (
            <li
              key={event._id}
              className="event-card"
              onClick={() => navigate(`/event/${event._id}`)} // Navigate to event details page
            >
              <h3>{event.eventDetails.title}</h3>
              <p>{truncateText(event.eventDetails.description, 50)}</p>
              <p><strong>Date:</strong> {new Date(event.eventDetails.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default EventsPage;
