import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footerContentSection">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/features'>Features</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-socials">
          <h4>Follow Us</h4>
          <ul className="social-media-links">
            <li><a href="">Facebook</a></li>
            <li><a href="">Twitter</a></li>
            <li><a href="">Instagram</a></li>
            <li><a href="">LinkedIn</a></li>
          </ul>
        </div>
        </div>
        
        <div className="footer-section contact-footer">
          <h4>Contact Us</h4>
          <div className='footer-email'>Email: <br/>
          <a href="mailto:mehulbansalswm1234@gmail.com">mehulbansalswm1234@gmail.com</a><br/>
          <a href="mailto:teeshakakkar2004@gmail.com">teeshakakkar2004@gmail.com</a>
          </div>
          <div>Phone: <a href="tel:+911234567890">+918595139817</a></div>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Campus Society. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
