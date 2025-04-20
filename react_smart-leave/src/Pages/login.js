import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import './LoginIcon.css';
import axios from 'axios';

import Footer from './Footer';

import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import Login_1 from '../Images/Login_1.jpg';
import Login_2 from '../Images/Login_2.jpg';
import Login_3 from '../Images/Login_3.jpg';
import Login_4 from '../Images/Login_4.jpg';
import Login_5 from '../Images/Login_5.jpg';
import Login_6 from '../Images/Login_6.jpg';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Logo from '../Images/Logo.png';



export default function Login() {

  const [email, setEmail] = useState('');  // State for email
  const [password, setPassword] = useState('');  // State for password
  const [error, setError] = useState(null);  // State for error handling
  const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message
  const navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload();  // Reloads the current page
  };


  function logout() {
    localStorage.removeItem('token');
    setLogoutMessage('You have been logged out successfully.'); // Set the logout message
    setTimeout(() => {
      window.location.href = '/'; // Redirect to the login page after 3 seconds
    }, 3000); // Delay the redirect for 3 seconds to show the message
  }


  const handleLogin = async (event) => {
    event.preventDefault();  // Prevent form from submitting normally

    // Create request body
    const loginData = { email, password };
    console.log('------');
    try {
      // Send POST request to your backend API for login using axios
      console.log(loginData);
      const response = await axios.post('http://localhost:8093/auth/login', loginData);

      const result = response.data;

      if (response.status === 200) {
        // Extract role from the response
        const { role } = result;

        if (role === 'leaveApplicant') {
          // If the role is 'leaveApplicant', navigate to /LeaveApply
          navigate('/LeaveApply');
        } else if (role === 'admin1') {
          // If the role is 'Admin1', navigate to /dashboard
          navigate('/DashBoard');
        } else if (role === 'admin2') {
          // If the role is 'Admin2', navigate to /dashboard2
          navigate('/DashBoard2');
        } else if (role === 'admin3') {
          // If the role is 'Admin3', navigate to /dashboard3
          navigate('/DashBoard3');
        } 
        else {
          // If the role is not recognized, show an error or handle it
          setError('Invalid role. Please contact support.');
        }
      } else {
        // Handle failed login
        setError(result.message || 'Login failed, please try again');
      }
    } catch (error) {
      // Handle any errors that occur during the axios request
      setError('An error occurred. Please try again.');
    }
  };

  const handleLoginGoogle = () => {
    window.location.href = "http://localhost:8093/auth/google"; // Redirect to backend
  };




  return (
    <div className="container-fluid p-0">

      {/* ..................................................................................................... */}
      {/* FOR LOGO */}

      <div className="row1 mb-0 " >

        <div className="col-sm-12 p-0 " style={{ marginRight: '0PX', padding: '0px' }}>
          <div className="p-1 mb-2 bg-black text-white d-flex align-items-center justify-content-between">


            <div className="col-sm-8 ">
              <div className="h6">
                <div className="contact-info d-flex align-items-center "> {/* Flexbox for contact info */}
                  <img src={Icon1} className="icon" alt="Web-site link" />
                  <span className="email">info@smartLeave.com</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="button-container ml-auto"> {/* Pushes buttons to the right */}
                <Button onClick={reloadPage} variant="btn btn-warning twinkle-button" className="mx-2 small-button main-button">Sign In</Button>
                <Button onClick={logout} variant="warning" className="mx-2 small-button main-button">Log Out</Button>
              </div>
            </div>

            <div className="col-sm-1" >
              <div className="icon-container"> {/* Wrapper for Icon2 */}
                <img src={Icon2} className="icon2" alt="Web-site link" />
              </div>
            </div>


          </div>
        </div>



        {/* ................... */}
        <div className="row">
  <div className="col-sm-12" style={{ marginTop: "-8px", padding: "0", marginLeft: "0" }}>
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
        WebkitBackgroundClip: "text", // for Chrome, Safari, and Opera
        color: "transparent" // Makes the text color transparent to show the gradient
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

        {/* Nav Bar
        <div className="col-sm-1">
          <button className="btn custom-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
            style={{ width: "40px", height: "40px", marginRight: "0", backgroundColor: "#064635", border: "none" }}>
            <div className="custom-icon">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </button>

          <div className="offcanvas offcanvas-end custom-offcanvas" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"
            style={{ backgroundColor: "#022B23", color: "white" }}>
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Welcome to Smart Leave!</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ButtonGroup vertical>
                <Button onClick={() => navigate("/")} variant="btn btn-outline-light" style={{ color: "white", width: "300px" }}>Home</Button>
                <Button onClick={() => navigate("../AboutUs")} variant="btn btn-outline-light" style={{ color: "white", width: "300px" }}>About Us</Button>
                <Button onClick={() => navigate("../ContactUs")} variant="btn btn-outline-light" style={{ color: "white", width: "300px" }}>Contact Us</Button>
              </ButtonGroup>
            </div>
          </div>
        </div> */}

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


      {/* ..................................................................................................... */}
      {/* FOR CAROUSEL PICTURES */}

      <div className="row " >


        <div className="col-sm-8" style={{ marginTop: "-8px", padding: "0" }}>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000"> {/* Enable auto cycling */}
            <div className="carousel-inner">

              <div className="carousel-item active" >
                <div className="zoom">
                  <img src={Login_1} className="d-block " alt="First slide" />

                  {/* ......................... */}


                  <div className="position-relative">
                    <div className="position-absolute bottom-0 start-0 translate-middle-y">
                      <h1 className='text-white bold-text an-army-text'>
                        <span className="fly-text fly-text-1 small-text">LEAVE</span><br /> <span className="fly-text fly-text-2 big-text">MADE EASY</span>
                      </h1>



                    </div>
                  </div>


                </div>
              </div>

              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_2} className="d-block " alt="Second slide" />

                  <div class="position-relative">
                    <div class="position-absolute bottom-0 start-0 translate-middle-y">
                      <h1 className='text-white bold-text an-army-text'>
                        <span className="fly-text fly-text-1 small-text">CONNECT WITH YOUR LEAVE</span><br /> <span className="fly-text fly-text-2 big-text">YOUR WELL-BEING MATTERS!</span>
                      </h1>
                    </div>
                  </div>


                </div>
              </div>

              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_3} className="d-block " alt="Third slide" />


                  <div class="position-relative">
                    <div class="position-absolute bottom-0 start-0 translate-middle-y">
                      <h1 className='text-white bold-text an-army-text'>
                        <span className="fly-text fly-text-1 small-text">EXPERIENCE A SEAMLESS  LEAVE APPLY</span><br /> <span className="fly-text fly-text-2 big-text">FOR OUR BRAVE HEROES.</span>
                      </h1>
                    </div>
                  </div>


                </div>
              </div>

              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_4} className="d-block " alt="Fourth slide" />


                  <div class="position-relative">
                    <div class="position-absolute  bottom-0 start-0 translate-middle-y">
                      <h1 className='text-white bold-text an-army-text'>
                        <span className="fly-text fly-text-1 small-text">YOUR LEAVE JOURNEY STARTS HERE.</span><br /> <span className="fly-text fly-text-2 big-text">QUICK, EASY, SECURE.</span>
                      </h1>
                    </div>
                  </div>


                </div>
              </div>

              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_5} className="d-block " alt="Fifth slide" />

                  <div class="position-relative">
                    <div class="position-absolute bottom-0 start-0 translate-middle-y">
                      <h1 className='text-white bold-text an-army-text'>
                        <span className="fly-text fly-text-1 small-text">TRACK YOUR LEAVE STATUS</span><br /> <span className="fly-text fly-text-2 big-text">ANYTIME, ANYWHERE.</span>
                      </h1>
                    </div>
                  </div>


                </div>
              </div>

              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_6} className="d-block " alt="Sixth slide" />

                  <div class="position-relative">
                    <div class="position-absolute bottom-0 start-0 translate-middle-y">
                      <h1 className='text-white bold-text an-army-text'>
                        <span className="fly-text fly-text-1 small-text">YOUR DUTY, YOUR LEAVE</span><br /> <span className="fly-text fly-text-2 big-text">APPLY WITH EASE.</span>
                      </h1>
                    </div>
                  </div>




                </div>
              </div>

            </div>
          </div>

          {/* ..................................................................................................... */}
          {/* FOR WORDS IN CAROUSEL PICTURES */}


        </div>


        {/* ......................................................................................................................................................................................................... */}
        {/* FOR FORM */}
        <div className="col-sm-4 d-flex justify-content-center">

  <div className="form p-1" style={{
    backgroundColor: "rgba(47, 79, 79, 0.7)", // Greenish-black with transparency
    borderRadius: '15px', 
    padding: '30px', 
    width: '100%', 
    border: '2px solid #2F4F4F', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)', // Apply blur effect
    WebkitBackdropFilter: 'blur(10px)', // Safari support
  }}>

    {/* Pills content */}
    <div className="tab-content">
      <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
        <form>
          <div className="styled-text fly-in-left mb-3">
            <p
              style={{
                color: "black", // Text color set to black for the label
              }}
            >
              Sign in with:
            </p>

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

          <p
            className="styled-text fly-in-left"
            style={{
              color: "black", // Text color set to black for this label
            }}
          >
            or:
          </p>

          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <label
              className="form-label"
              htmlFor="loginName"
              style={{
                color: "black", // Text color set to black for this label
              }}
            >
              Email or username
            </label>
          </div>

          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4 ">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <label
              className="form-label"
              htmlFor="loginPassword"
              style={{
                color: "black", // Text color set to black for this label
              }}
            >
              Password
            </label>
          </div>

          {/* Error Message Display */}
{error && (
  <div className="alert alert-danger" role="alert">
    ⚠️ Please check your username and password again.
  </div>
)}


          {/* 2 column grid layout */}
          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center">
              {/* Checkbox */}
              <div className="form-check mb-3 mb-md-0">
                <input
                  className="form-check-input custom-checkbox"
                  type="checkbox"
                  value=""
                  id="loginCheck"
                  checked
                />
                <label
                  className="form-check-label"
                  htmlFor="loginCheck"
                  style={{
                    color: "black", // Text color set to black for the label
                  }}
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="col-md-6 d-flex justify-content-center">
              {/* Simple link */}
              <a
                href="#!"
                className="forgot-password-link"
                style={{
                  color: "black", // Text color set to black for the link
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit button */}
          <div className="row mb-4">
            <div className="col-md-12 d-flex justify-content-center">
              <button
                onClick={handleLogin}
                type="submit"
                className="btn w-50"
                style={{
                  backgroundColor: "#2F4F4F", // Greenish-black background for the Sign In button
                  color: "white", // Text color for the button set to white
                  borderRadius: "25px", // Rounded corners for the button
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
        {/* Form end */}
      </div>
    </div>
    {/* Pills content */}
  </div>
</div>

      </div>


      {/* For Footer................................................ */}
      <Footer />


    </div>
  );
}