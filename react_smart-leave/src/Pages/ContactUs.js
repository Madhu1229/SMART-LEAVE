import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';
import { Button } from 'react-bootstrap';
import HomeNavBar from './HomeNavBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import './LoginIcon.css';

import 'react-datepicker/dist/react-datepicker.css';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';


export default function ContactUs() {
  

  const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message
  const navigate = useNavigate(); // Create navigate function

  function logout() {
    localStorage.removeItem('token');
    setLogoutMessage('You have been logged out successfully.'); // Set the logout message
    setTimeout(() => {
      window.location.href = '/'; // Redirect to the login page after 3 seconds
    }, 3000); // Delay the redirect for 3 seconds to show the message
  }
  
  
    

  return (
    <div className="container-fluid p-0">
      
      {/* ..................................................................................................... */}
      {/* FOR LOGO */}
      
      <div className="row1 mb-0">
        <div className="col-sm-12 p-0">
          <div className="p-1 mb-2 bg-black text-white d-flex align-items-center justify-content-between">
            <div className="col-sm-8">
              <div className="h6">
                <div className="contact-info d-flex align-items-center">
                  <img src={Icon1} className="icon" alt="Web-site link" />
                  <span className="email">info@smartLeave.com</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
             <div className="button-container ml-auto"> {/* Pushes buttons to the right */}
                             <Button onClick={()=>navigate("/Login")} variant="btn btn-warning twinkle-button" className="mx-2 small-button main-button">Sign In</Button>
                             <Button onClick={logout} variant="warning" className="mx-2 small-button main-button">Log Out</Button>
              </div>
            </div>

            <div className="col-sm-1">
              <div className="icon-container">
                <img src={Icon2} className="icon2" alt="Web-site link" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ....................Nav Bar............................. */}
      <HomeNavBar />

{/* Log out message............... */}
      {logoutMessage && (
  <div className="alert alert-success" role="alert">
    {logoutMessage}
  </div>
)}

      {/* ...................For Contact Us....................... */}
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="info-box">
          <h2>Address</h2>
          <p>Army Headquarters</p>
          <p>Sri Jayawardenepura</p>
          <p>Colombo</p>
        </div>
        <div className="info-box">
          <h2>Telephone Numbers</h2>
          <p>Army Headquarters: +94112432682-5 / +94766907749</p>
          <p>Only for web & media inquiries: +94112076967</p>
        </div>
        <div className="info-box">
          <h2>Fax</h2>
          <p>Only for web & media inquiries: +94112076967</p>
        </div>
        <div className="info-box">
          <h2>Email</h2>
          <p>slarmymedia@gmail.com (Only for web & media inquiries)</p>
          <p>dteofmedia&psyops@army.lk (Only for web & media inquiries)</p>
          <p>info@army.lk (Only for Right To Information inquiries)</p>
        </div>
      </div>

      {/* ...............................................For Footer................................................ */}
      <Footer />
    </div>
  );
}
