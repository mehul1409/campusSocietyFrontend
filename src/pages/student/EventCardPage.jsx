import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {marked} from 'marked'
import './EventCardPage.css';

const EventCardPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://campussociety.onrender.com/api/getEventById/${eventId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch event details.');
        }

        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setErrorMessage('An error occurred while fetching event details.');
        setTimeout(() => setErrorMessage(''), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const renderDescriptionWithNewLines = (description) => {
    const markdownToHtml = marked(description, { breaks: true }); 
    return { __html: markdownToHtml };
  };
  
  return (
    <div className="event-card-page">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {eventDetails ? (
            <div className="event-details">
              <h1>
                <span>Events Synergy'25</span>
                <br />
                {eventDetails.event.eventDetails.title}
              </h1>
              <div className="">
                
              </div>
              <div className='event-intro12'>
              <img
                className="event-image"
                src={eventDetails.event.eventDetails.photo ||'/event.png'}
                alt={eventDetails.event.eventDetails.title}
              />
              <div className="event-section">
                <h2>EVENT INTRODUCTION</h2>
                <ul>
                  <li dangerouslySetInnerHTML={renderDescriptionWithNewLines(
                        eventDetails.event.eventDetails.description
                      )} />
                </ul>
                <div className='eventButton'>
              {eventDetails.event.media.map((media) => (
                <button key={media.name} className='event-form-link'><a href={media.link} target="_blank">{media.name}</a></button>
              ))}
              </div>
              </div>
              </div>
            </div>
          ) : (
            <p>No event details available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default EventCardPage;
