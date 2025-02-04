import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HomeNavBar from './HomeNavBar';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';

import './LoginIcon.css';

export default function Notices() {
  const navigate = useNavigate(); // Initialize useNavigate

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
              <div className="button-container ml-auto">
                <Button 
                  onClick={() => navigate("/Login")} // Fixed navigation
                  variant="btn btn-warning twinkle-button" 
                  className="mx-2 small-button main-button"
                >
                  Sign In
                </Button>
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

      {/* Notices Section */}
      <div>
        <h2 className="text-center my-4">Notices</h2>
        <p className="text-center">All important announcements will be displayed here.</p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
