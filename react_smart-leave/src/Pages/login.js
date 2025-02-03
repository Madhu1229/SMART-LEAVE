import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
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

  const Navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload();  // Reloads the current page
  };


  function logout() {
    // Remove the token from localStorage (or cookies)
    localStorage.removeItem('token');  // Or use sessionStorage/cookies if preferred
    console.log('Logged out successfully');
    // Redirect the user to the login page
    window.location.href = '/login'; // Redirect to the login page or home page
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
          Navigate('/LeaveApply');
        } else if (role === 'admin1') {
          // If the role is 'Admin1', navigate to /dashboard
          Navigate('/DashBoard');
        } else if (role === 'admin2') {
          // If the role is 'Admin1', navigate to /dashboard
          Navigate('/DashBoard');
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
        <div className="row " >
          <div className="col-sm-12" style={{ marginTop: "-8px", padding: "0", marginLeft: "0" }}>
            <div className="p-1 mb-2 bg-success   bg-opacity-75  align-items-center justify-content-between">
              <div className="row " style={{ marginRight: "0" }}>
                <div className="col-sm-2">
                  <img src={Logo} className="fixed-logo img-fluid" alt="SL Army Logo" />

                </div>

                <div className="col-sm-9" >
                  <div className="animated-text-container">
                    <br />
                    <h1 className="display-1 large-text">WELCOME TO SMART - LEAVE</h1>




                    <p className="sentence1" style={{ color: "#3e4551", fontWeight: "700", animation: "flyIn 2s ease-in-out", fontSize: "25px" }}>
                      SRI LANKA ARMY
                    </p>

                    <p className="sentence2" style={{ color: "#ff5722", fontWeight: "60px", textDecorationLine: "overline", animation: "flyIn 3s ease-in-out", fontSize: "20px" }}>
                      Defender of the Nature
                    </p>



                  </div>

                </div>

                {/* ................................Nav Bar........................... */}

                <div className="col-sm-1">

                  <button class="btn btn-success custom-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ width: "40px", height: "40px", marginRight: "0" }}>
                    <div className="custom-icon">
                      <div className="line"> </div>
                      <div className="line"> </div>
                      <div className="line"> </div>
                    </div>
                  </button>




                  <div class="offcanvas offcanvas-end ustom-offcanvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header" >
                      <h5 id="offcanvasRightLabel" style={{ color: "white" }}>Welcome to Smart Leave!</h5>
                      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body" >

                      <ButtonGroup vertical >
                        <Button onClick={() => Navigate("/")} variant="btn btn-outline-success" style={{ color: "white", width: "300px" }}>Home</Button>
                        <Button onClick={() => Navigate("../AboutUs")} variant="btn btn-outline-success" style={{ color: "white", width: "300px" }}>About Us</Button>
                        <Button onClick={() => Navigate("../ContactUs")} variant="btn btn-outline-success" style={{ color: "white", width: "300px" }}>Contact Us</Button>
                        <Button onClick={logout} variant="btn btn-outline-success" style={{ color: "red", width: "300px" }}>Log Out</Button>

                      </ButtonGroup>

                    </div>
                  </div>
                </div>


              </div>
            </div>


          </div>
        </div>
      </div>




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
        <div className="col-sm-4 ">
          <div className="form p-1 ">

            {/* <!-- Pills content --> */}
            <div class="tab-content">
              <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form>
                  <div class="styled-text fly-in-left mb-3">
                    <p>Sign in with:</p>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                      <i class="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                      <i class="fab fa-google"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                      <i class="fab fa-twitter"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                      <i class="fab fa-github"></i>
                    </button>
                  </div>

                  <p class="styled-text fly-in-left">or:</p>

                  {/* <!-- Email input --> */}
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                    <label class="form-label " for="loginName">Email or username</label>
                  </div>

                  {/* <!-- Password input --> */}
                  <div data-mdb-input-init class="form-outline mb-4 ">
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <label class="form-label" for="loginPassword">Password</label>
                  </div>

                  {/* <!-- 2 column grid layout --> */}
                  <div class="row mb-4">

                    <div class="col-md-6 d-flex justify-content-center">
                      {/* <!-- Checkbox --> */}
                      <div class="form-check mb-3 mb-md-0">
                        <input class="form-check-input custom-checkbox" type="checkbox" value="" id="loginCheck" checked />
                        <label class="form-check-label" for="loginCheck"> Remember me </label>
                      </div>
                    </div>

                    <div class="col-md-6 d-flex justify-content-center">
                      {/* <!-- Simple link --> */}
                      <a href="#!" class="forgot-password-link">Forgot password?</a>
                    </div>

                  </div>


                  {/* remove sign in row............................................................................ */}
                  {/* <!-- Submit button --> */}
                  {/* <button1 onClick={() => Navigate("../LeaveApply")} type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-success bg-opacity-25 btn-block mb-4">Sign In</button1> */}
                  <div className="row mb-4">
                    <div className="col-md-6 d-flex justify-content-center">
                      <button onClick={handleLogin} type="submit" className="btn btn-success w-100">
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- Pills content --> */}
          </div>


        </div>
      </div>


      {/* For Footer................................................ */}
      <Footer />


    </div>
  );
}
