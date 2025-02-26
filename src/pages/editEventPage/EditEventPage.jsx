import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditEventPage.css';

const EditEventPage = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
  });

  const [media, setMedia] = useState([]); // Store media separately
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch event details and media separately
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://campussociety.onrender.com/coordinator/getEventById/${eventId}`, {
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
        if (data.event) {
          setEventDetails({
            title: data.event.eventDetails.title || '',
            description: data.event.eventDetails.description || '',
            date: data.event.eventDetails.date || '',
          });

          setMedia(Array.isArray(data.event.media) ? data.event.media : []); // Store media separately
        } else {
          setErrorMessage('Event not found');
        }
      } catch (error) {
        setErrorMessage('Error fetching event details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  console.log({ eventDetails, media });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle media updates
  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...media];
    updatedMedia[index] = { ...updatedMedia[index], [field]: value };
    setMedia(updatedMedia);
  };

  // Add a new media entry
  const addMedia = () => {
    setMedia([...media, { name: '', link: '' }]);
  };

  // Remove a media entry
  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://campussociety.onrender.com/coordinator/editEvent`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'coordinatorauthorize': localStorage.getItem('coordinatorauthorize'),
        },
        body: JSON.stringify({ eventId, eventDetails, media }),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/coordinator-dashboard');
      }, 1500);
    } catch (error) {
      setErrorMessage('Error updating event. Please try again later.');
      setTimeout(() => setErrorMessage(''), 2000);
    } finally {
      setIsSubmitting(false); // Stop loading if an error occurs
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

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

        {/* Media Section */}
        <div className="form-group">
          <label>Media</label>
          {media.length === 0 && <p>No media added yet.</p>}
          {media.map((item, index) => (
            <div key={index} className="media-group">
              <input
                type="text"
                placeholder="Media Name"
                value={item.name}
                onChange={(e) => handleMediaChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Media Link"
                value={item.link}
                onChange={(e) => handleMediaChange(index, 'link', e.target.value)}
              />
              <button type="button" onClick={() => removeMedia(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addMedia}>Add Media</button>
        </div>

        <button type="submit" className="update-submit-button" disabled={isSubmitting}>
          {isSubmitting ? <div className="loader"></div> : "Update Event"}
        </button>
      </form>

      <hr />
      <div className="mainLogoImage">
        <div className="aboveimage">
          "Join the Campus Society — Connect, Collaborate, and Grow Together!"
        </div>
        <img src="/mainLogo.png" alt="Campus Logo" />
        <div className="belowimage">
          "Proudly developed for the Campus Community with passion and dedication."
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
