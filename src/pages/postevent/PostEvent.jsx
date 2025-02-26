import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostEvent.css';

const PostEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [file, setFile] = useState(null);
  const [eventLinks, setEventLinks] = useState([{ name: '', link: '' }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEventLinkChange = (index, field, value) => {
    const updatedEventLinks = [...eventLinks];
    updatedEventLinks[index][field] = value;
    setEventLinks(updatedEventLinks);
  };

  const addEventLink = () => {
    setEventLinks([...eventLinks, { name: '', link: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coordinatordetials = JSON.parse(localStorage.getItem('coordinatordetails'));
    const coordinatorId = coordinatordetials ? coordinatordetials.coordinator._id : null;

    if (!eventDetails.title) {
      setErrorMessage('All fields are required.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    try {

      const formData = new FormData();
      formData.append('coordinatorId', coordinatorId);
      formData.append('title', eventDetails.title);
      formData.append('description', eventDetails.description);
      formData.append('date', eventDetails.date);
      formData.append('photo', file);

      formData.append('eventLinks', JSON.stringify(eventLinks));

      console.log(formData);

      const response = await fetch('https://campussociety.onrender.com/coordinator/PostEvent', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          'coordinatorauthorize': localStorage.getItem('coordinatorauthorize'),
        },
        body:formData,
      });

      if (response.ok) {
        setSuccessMessage('Event posted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/coordinator-dashboard');
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while posting the event. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };
  return (
    <div className="post-event-container">
    <h2 className="post-event-heading">Post Event</h2>
  
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    {successMessage && <p className="success-message">{successMessage}</p>}
  
    <form className="post-event-form" onSubmit={handleSubmit}>
      <div>
        <label className="post-event-label">Event Title</label>
        <input
          className="post-event-input"
          type="text"
          name="title"
          value={eventDetails.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="post-event-label">Event Description</label>
        <textarea
        rows={10}
          className="post-event-textarea"
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
          // required
        />
      </div>
      <div>
        <label className="post-event-label">Event Date</label>
        <input
          className="post-event-input"
          type="date"
          name="date"
          value={eventDetails.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
          <label className="post-event-label">Event Links</label>
          {eventLinks.map((event, index) => (
            <div key={index} className="event-link-container">
              <input
                className="post-event-input"
                type="text"
                placeholder="Event Name"
                value={event.name}
                onChange={(e) => handleEventLinkChange(index, 'name', e.target.value)}
              />
              <input
                className="post-event-input"
                type="string"
                placeholder="Event Link"
                value={event.link}
                onChange={(e) => handleEventLinkChange(index, 'link', e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="add-event-link-button" onClick={addEventLink}>
            + Add More
          </button>
        </div>
      <div>
          <label className="post-event-label">Upload Event Image</label>
          <input
            className="post-event-input"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      <button className="post-event-button" type="submit">Post Event</button>
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

export default PostEvent;
