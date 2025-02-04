import React ,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css'; 
import { Button } from 'react-bootstrap';
import HomeNavBar from './HomeNavBar';
import Footer from './Footer';
import 'react-datepicker/dist/react-datepicker.css';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';

import './LoginIcon.css';

// ✅ Import useNavigate instead of Navigate
import { useNavigate } from 'react-router-dom';



export default function AboutUs() {
  

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
      {/* FOR LOGO */}
      <div className="row1 mb-0">
        <div className="col-sm-12 p-0" style={{ marginRight: '0PX', padding: '0px' }}>
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

      {/* Nav Bar */}
      <HomeNavBar />

      {/* Log out message............... */}
      {logoutMessage && (
  <div className="alert alert-success" role="alert">
    {logoutMessage}
  </div>
)}

      {/* About Us Section */}
      <div className="about-us-container">
        <div className="about-us-content">
          <h1 className="title1">About SMART LEAVE</h1>
          <p className="description">
            <strong>SMART LEAVE</strong> is an automated leave management system designed specifically for the Sri Lanka Army. 
            It aims to simplify the process of applying for leave, tracking leave balances, and ensuring timely approval of leave applications.
          </p>
          <p className="description">
            This system was developed to reduce paperwork, improve communication, and streamline the entire leave management process.
          </p>
          <p className="description">
            <strong>Design Date: </strong> September 2024
          </p>
          <p className="description">
            With its mobile-friendly interface, and advanced leave tracking capabilities, <strong>SMART LEAVE</strong> empowers both military personnel and administrators to handle leave requests efficiently and securely.
          </p>
          <div className="design-effect">
            <p>Designed with care for the Sri Lanka Army</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
