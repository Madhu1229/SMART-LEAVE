import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import './LoginIcon.css';
import axios from 'axios';

import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import Login_1 from '../Images/Login_1.jpg';
import Login_2 from '../Images/Login_2.jpg';
import Login_3 from '../Images/Login_3.jpg';
import Login_4 from '../Images/Login_4.jpg';
import Login_5 from '../Images/Login_5.jpg';
import Login_6 from '../Images/Login_6.jpg';
import Logo from '../Images/Logo.png';
import MainTitleHome from './MainTitleHome';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const carouselItems = [
    { 
      image: Login_1, 
      text1: "LEAVE", 
      text2: "MADE EASY",
      textStyle: { color: "#ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }
    },
    { 
      image: Login_2, 
      text1: "CONNECT WITH YOUR LEAVE", 
      text2: "YOUR WELL-BEING MATTERS",
      textStyle: { color: "#f8f9fa", textShadow: "2px 2px 8px #000000" }
    },
    { 
      image: Login_3, 
      text1: "SIMPLIFYING LEAVE. EMPOWERING SOLDIERS", 
      text2: "THE FUTURE IS SMART LEAVE",
      textStyle: { color: "#ffffff", textShadow: "0 0 10px rgba(0,0,0,0.8)" }
    },
    { 
      image: Login_4, 
      text1: "YOUR TIME, YOUR DUTY", 
      text2: "YOUR LEAVE — NOW IN ONE SMART SYSTEM",
      textStyle: { color: "#e9ecef", textShadow: "3px 3px 6px #000000" }
    },
    { 
      image: Login_5, 
      text1: "APPLY. APPROVE.TRACK.", 
      text2: "ALL IN ONE PLACE",
      textStyle: { color: "#ffffff", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }
    },
    { 
      image: Login_6, 
      text1: "DESIGNED FOR SOLDIERS", 
      text2: " POWERED BY TECHNOLOGY",
      textStyle: { color: "#f8f9fa", textShadow: "0 0 8px rgba(0,0,0,0.9)" }
    }
  ];

  const handleClick = () => {
    navigate('/ResetPasswordForm');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = { email, password };
    try {
      const response = await axios.post('http://localhost:8093/auth/login', loginData);
      const result = response.data;

      if (response.status === 200) {
        const { role } = result;
        if (role === 'leaveApplicant') navigate('/LeaveApply');
        else if (role === 'admin1') navigate('/DashBoard');
        else if (role === 'admin2') navigate('/DashBoard2');
        else if (role === 'admin3') navigate('/DashBoard3');
        else setError('Invalid role. Please contact support.');
      } else {
        setError(result.message || 'Login failed, please try again');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:8093/auth/google";
  };

  return (
    <div className={`p-0 m-0 ${showLoginModal ? 'modal-open' : ''}`}>
      
      {/* Blur overlay when modal is open */}
      {showLoginModal && <div className="modal-backdrop fade show" style={{ backdropFilter: 'blur(5px)' }}></div>}

      {/* Header Section */}
      <div className="row1 mb-0">
        <MainTitleHome/>
        <div className="row">
          <div className="col-sm-12" style={{ marginTop: "-1px", padding: "0", marginLeft: "0" }}>
            <div className="p-1 mb-2 align-items-center justify-content-between" style={{ backgroundColor: "#022B23", opacity: "0.9" }}>
              <div className="row" style={{ marginRight: "0" }}>
                <div className="col-sm-2">
                  <img src={Logo} className="fixed-logo img-fluid" alt="SL Army Logo" />
                </div>
                <div className="col-sm-9">
                  <div className="animated-text-container">
                    <br />
                    <h1 className="display-1 large-text" 
                        style={{
                          background: "linear-gradient(to right, red, gold)",
                          WebkitBackgroundClip: "text",
                          color: "transparent"
                        }}>
                      WELCOME TO SMART - LEAVE
                    </h1>
                    <p className="sentence1" style={{ color: "#d1d1d1", fontWeight: "700", animation: "flyIn 2s ease-in-out", fontSize: "25px" }}>
                      SRI LANKA ARMY
                    </p>
                    <p className="sentence2" style={{ color: "#ff5722", fontWeight: "60px", textDecorationLine: "overline", animation: "flyIn 3s ease-in-out", fontSize: "20px" }}>
                      Defender of the Nature
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {logoutMessage && (
        <div className="alert alert-success" role="alert">
          {logoutMessage}
        </div>
      )}

      {/* Main Content with Carousel */}
      <div className="row position-relative">
        <div className="col-sm-12" style={{ marginTop: "-8px", padding: "0" }}>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
            <div className="carousel-inner">
              {carouselItems.map((item, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="zoom">
                    <img src={item.image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    <div className="position-relative">
                      <div className="position-absolute bottom-0 start-0 translate-middle-y p-4">
                        <h1 className='bold-text an-army-text' style={item.textStyle}>
                          <span className="fly-text fly-text-1" style={{ fontSize: '2rem', display: 'block' }}>{item.text1}</span>
                          <span className="fly-text fly-text-2" style={{ fontSize: '4rem', display: 'block' }}>{item.text2}</span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sign In Button overlay */}
        <div className="d-flex justify-content-center w-100" style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          zIndex: 100
        }}>
          <button
            onClick={() => setShowLoginModal(true)}
            className="btn btn-primary"
            style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              borderRadius: '30px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              backgroundColor: '#022B23',
              border: '2px solid gold',
              width: 'fit-content'
            }}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Scrolling About Us and Contact Us Cards */}
      <div className="about-contact-container">
        <div className="scrolling-cards">
          {/* About Us Card */}
          <div className="card">
            <h2>About SMART LEAVE</h2>
            <p>
              <strong>SMART LEAVE</strong> is an automated leave management system designed specifically 
              for the Sri Lanka Army. It simplifies the process of applying for leave, tracking leave 
              balances, and ensuring timely approval.
            </p>
            <p>
              Developed to reduce paperwork and improve communication, this system streamlines 
              the entire leave management process.
            </p>
            <p><strong>Design Date:</strong> September 2024</p>
          </div>
          
          {/* Contact Us Card */}
          <div className="card">
            <h2>Contact Us</h2>
            <p><strong>Address:</strong> Army Headquarters, Sri Jayawardenepura, Colombo</p>
            <p><strong>Telephone:</strong> +94112432682-5 / +94766907749</p>
            <p><strong>Email:</strong> slarmymedia@gmail.com</p>
            <p><strong>For media inquiries:</strong> dteofmedia&psyops@army.lk</p>
          </div>
          
          {/* Features Card */}
          <div className="card">
            <h2>Key Features</h2>
            <ul>
              <li>Real-time leave tracking</li>
              <li>Mobile-friendly interface</li>
              <li>Automated approval workflows</li>
              <li>Secure data encryption</li>
              <li>Multi-level administration</li>
            </ul>
          </div>
          
          {/* Mission Card */}
          <div className="card">
            <h2>Our Mission</h2>
            <p>
              To empower Sri Lanka Army personnel with a modern, efficient, and transparent 
              leave management system that respects their service and dedication.
            </p>
            <p className="text-muted">
              "Designed with care for the defenders of our nation"
            </p>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)}
        centered
        backdrop="static"
        dialogClassName="modal-dialog-centered modal-dialog-scrollable"
        contentClassName="border-0"
      >
        <Modal.Body className="p-4" style={{ backgroundColor: "rgba(47, 79, 79, 0.95)", borderRadius: '15px' }}>
          <button 
            onClick={() => setShowLoginModal(false)}
            className="btn-close position-absolute top-0 end-0 m-3"
            style={{ color: 'white' }}
          />
          
          <div className="tab-content">
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
              <form>
                <div className="text-center mb-4">
                  <h3 style={{ color: 'white' }}>Sign In</h3>
                </div>
                
                <div className="styled-text fly-in-left mb-3">
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <button
                      onClick={handleLoginGoogle}
                      type="button"
                      className="btn btn-light"
                      style={{
                        width: "250px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        border: "1px solid #ddd",
                        borderRadius: "25px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                      }}
                    >
                      <img 
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                        alt="Google Logo" 
                        style={{ width: "24px", height: "24px" }} 
                      />
                      Sign in with Google
                    </button>
                  </div>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0" style={{ color: 'white' }}>OR</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <label className="form-label mt-2" style={{ color: "white" }}>
                    Email or username
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <label className="form-label mt-2" style={{ color: "white" }}>
                    Password
                  </label>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    ⚠️ Please check your username and password again.
                  </div>
                )}

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="loginCheck"
                        checked
                      />
                      <label className="form-check-label" htmlFor="loginCheck" style={{ color: "white" }}>
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6 text-end">
                    <a
                      href="#!"
                      className="text-white"
                      onClick={handleClick}
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  type="submit"
                  className="btn w-100 mb-3"
                  style={{
                    backgroundColor: "#2F4F4F",
                    color: "white",
                    borderRadius: "25px",
                    padding: '10px'
                  }}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
}