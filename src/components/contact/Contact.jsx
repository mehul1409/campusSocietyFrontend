import React, { useState } from 'react';
import './Contact.css';

const ContactUs = () => {

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://campussociety.onrender.com/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className='contact-page1'>
    <div className="contact-section1" id="contact">
          <div className="contact-content1">
            <h1 className="contact-title1">CONTACT US</h1>
            <form onSubmit={handleSubmit} className="contact-form1">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send Message</button>
            </form>
            {message && <p className="success-message1">{message}</p>}
            <div className="contact-info1">
              <p>Or Contact Us Here:</p>
              <a href="mailto:teeshakakkar2004@gmail.com">teeshakakkar2004@gmail.com</a>
              <a href="mailto:mehulbansalswm@gmail.com">mehulbansalswm1234@gmail.com</a>
            </div>
          </div>
        </div>
        </div>
  );
};

export default ContactUs;
