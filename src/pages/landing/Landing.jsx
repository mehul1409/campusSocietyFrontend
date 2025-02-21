import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [message, setMessage] = useState("");

  function calculateTimeLeft() {
    const targetDate = new Date("2025-02-27T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="jiit animated-text">JIIT YOUTH CLUB</h1>
            <h1 className="presents animated-text">presents</h1>
            <h1 className="synergy-text animated-text">SYNERGY</h1>
            <h1 className="synergy-text animated-text">25'</h1>
            <h1 className="fest animated-text">ANNUAL TECHNO CULTURAL FEST</h1>
            {/* Buttons Section */}
            <div className="button-container">
              <button className="medieval-btn" onClick={() => navigate("/register")}>
                Register Now
              </button>
              <button className="medieval-btn" onClick={() => navigate("/about")}>
                Learn More
              </button>
            </div>

            {/* Countdown Timer */}
            <div className="countdown-timer">
              <h2>Event Starts In:</h2>
              <div className="time-boxes">
                <div className="time-box">
                  <span>{timeLeft.days}</span>
                  <small>Days</small>
                </div>
                <div className="time-box">
                  <span>{timeLeft.hours}</span>
                  <small>Hours</small>
                </div>
                <div className="time-box">
                  <span>{timeLeft.minutes}</span>
                  <small>Minutes</small>
                </div>
                <div className="time-box">
                  <span>{timeLeft.seconds}</span>
                  <small>Seconds</small>
                </div>
              </div>
            </div>
            <div className="next-page" onClick={scrollToAbout}>
              <svg
                className="arrow-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fac4b2"
                  d="M256 294.1L90.1 128.1c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l194.3 194.3c12.5 12.5 32.8 12.5 45.3 0L467.2 173.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 294.1z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="about-section" id="about">
          <div className="about-content">
            <h1 className="about-title">ABOUT SYNERGY 25'</h1>
            <p className="about-text">
              Welcome to <span>Synergy 25'</span>, the grand annual
              <span> techno-cultural fest</span> of JIIT, where
              innovation meets tradition in an unforgettable spectacle of
              <span> art, technology, and culture.</span>

              <br />

              Experience a fusion of <span> cutting-edge events, competitions,
                and mesmerizing performances</span> that celebrate the spirit
              of creativity and collaboration. Witness the brilliance of
              aspiring <span> engineers, artists, and innovators</span> as
              they showcase their talents across multiple domains, pushing
              the boundaries of possibility.

              <br />

              Dive into a world where <span> technology meets imagination,
                where cultures intertwine</span>, and where friendships are
              forged in the fires of passion and competition. Whether you
              are a tech enthusiast eager to compete in thrilling hackathons,
              an artist ready to mesmerize the audience with your creativity,
              or a performer aiming to set the stage on fire -
              <span> Synergy 25' has something extraordinary for everyone.</span>

              <br /><br />

              Join us in this unforgettable journey, where every moment
              is filled with <span> electrifying energy, groundbreaking ideas,
                and an experience that will stay with you forever.</span>
              <br />
              <span>Are you ready to be part of the legend?</span>
            </p>
          </div>

        </div>



        {/* Contact Section */}
        <div className="contact-section" id="contact">
          <div className="contact-content">
            <h1 className="contact-title">CONTACT US</h1>
            <form onSubmit={handleSubmit} className="contact-form">
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
            {message && <p className="success-message">{message}</p>}
            <div className="contact-info">
              <p>Or Contact Us Here:</p>
              <a href="mailto:teeshakakkar2004@gmail.com">teeshakakkar2004@gmail.com</a>
              <a href="mailto:mehulbansalswm@gmail.com">mehulbansalswm1234@gmail.com</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Landing;















