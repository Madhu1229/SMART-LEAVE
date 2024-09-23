import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 
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
  return (
    <div className="container-fluid">
      
      {/* ..................................................................................................... */}
      {/* FOR LOGO */}
      <div className="row1 ">
  <div className="col-sm-12">
    <div className="p-0.5 mb-2 bg-black text-white d-flex align-items-center justify-content-between">
      <div className="h6">
        <div className="contact-info">
          <img src={Icon1} className="icon" alt="Web-site link" />
          <span className="email">info@smartleave.com</span>
        </div>
      </div>
      <div className="icon-container"> {/* Wrapper for Icon2 */}
      <img src={Icon2} className="icon2" alt="Web-site link" /> {/* Icon2 in right corner */}
    </div>
    </div>
  </div>
</div>


    
      <div className="row">
        <div className="col-sm-12">
          <div className="p-3 mb-2 bg-success p-2 text-dark bg-opacity-75 d-flex align-items-center justify-content-between">
            <div className="col-sm-2">
              <img src={Logo} className="fixed-logo img-fluid" alt="SL Army Logo" />
              
            </div>

      <div className="col-sm-10 ">
        <h1 className="display1 large-text">WELCOME TO SMART - LEAVE</h1>

      </div>

    </div>
  </div>
</div>


      <div className="row">
        {/* ..................................................................................................... */}
        {/* FOR CAROUSEL PICTURES */}

        <div className="col-sm-8">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000"> {/* Enable auto cycling */}
            <div className="carousel-inner">
              
              <div className="carousel-item active" >
                <div className="zoom">
                  <img src={Login_1} className="d-block " alt="First slide" />
                </div>
              </div>

              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_2} className="d-block " alt="Second slide" />
                </div>
              </div>

              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_3} className="d-block " alt="Third slide" />
                </div>
              </div>

              <div className="carousel-item" >
              <div className="zoom">
                <img src={Login_4} className="d-block " alt="Fourth slide" />
              </div>
              </div>

              <div className="carousel-item" >
              <div className="zoom">
                <img src={Login_5} className="d-block " alt="Fifth slide" />
              </div>
              </div>

              <div className="carousel-item" >
              <div className="zoom">
                <img src={Login_6} className="d-block " alt="Sixth slide" />
              </div>
              </div>
            
            </div>
         </div>

        {/* ..................................................................................................... */}
        {/* FOR WORDS IN CAROUSEL PICTURES */}

        <div class="position-relative">
          <div class="position-absolute bottom-0 start-75 translate-left-x">
            <h1 className='text-white bold-text an-army-text'>
              <span className="fly-text fly-text-1 small-text">AN ARMY</span><br/> <span className="fly-text fly-text-2 big-text">WITH A HEART</span>
            </h1>
          </div>
        </div>

        </div>


        {/* ......................................................................................................................................................................................................... */}
        {/* FOR FORM */}
        <div className="col-sm-4">

        {/* <!-- Pills navs --> */}
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" id="tab-login" data-bs-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="tab-register" data-bs-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
            </li>
          </ul>

        {/* <!-- Pills content --> */}
        <div class="tab-content">
          <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>
              <div class="text-center mb-3">
                <p>Sign in with:</p>

                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                  </button>

                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>

                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                  </button>

                  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                  </button>
              </div>

                <p class="text-center">or:</p>

        {/* <!-- Email input --> */}
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="email" id="loginName" class="form-control" />
          <label class="form-label" for="loginName">Email or username</label>
        </div>

        {/* <!-- Password input --> */}
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="password" id="loginPassword" class="form-control" />
          <label class="form-label" for="loginPassword">Password</label>
        </div>

        {/* <!-- 2 column grid layout --> */}
        <div class="row mb-4">
          
          <div class="col-md-6 d-flex justify-content-center">
            {/* <!-- Checkbox --> */}
            <div class="form-check mb-3 mb-md-0">
              <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                <label class="form-check-label" for="loginCheck"> Remember me </label>
              </div>
          </div>

          <div class="col-md-6 d-flex justify-content-center">
            {/* <!-- Simple link --> */}
            <a href="#!">Forgot password?</a>
          </div>

        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>

        {/* <!-- Register buttons --> */}
        <div class="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
        </div>
      </form>
    </div>
    <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
      <form>
        <div class="text-center mb-3">
          <p>Sign up with:</p>
          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>

          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>

        <p class="text-center">or:</p>

        {/* <!-- Name input --> */}
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" id="registerName" class="form-control" />
          <label class="form-label" for="registerName">Name</label>
        </div>

        {/* <!-- Username input --> */}
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" id="registerUsername" class="form-control" />
          <label class="form-label" for="registerUsername">Username</label>
        </div>

        {/* <!-- Email input --> */}
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="email" id="registerEmail" class="form-control" />
          <label class="form-label" for="registerEmail">Email</label>
        </div>

        {/* <!-- Password input --> */}
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="password" id="registerPassword" class="form-control" />
          <label class="form-label" for="registerPassword">Password</label>
        </div>

        {/* <!-- Repeat Password input --> */}
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="password" id="registerRepeatPassword" class="form-control" />
          <label class="form-label" for="registerRepeatPassword">Repeat password</label>
        </div>

        {/* <!-- Checkbox --> */}
        <div class="form-check d-flex justify-content-center mb-4">
          <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
            aria-describedby="registerCheckHelpText" />
          <label class="form-check-label" for="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-3">Sign in</button>
      </form>
    </div>
  </div>
  {/* <!-- Pills content --> */}
          </div>
  </div>
      </div>
    );
  }
