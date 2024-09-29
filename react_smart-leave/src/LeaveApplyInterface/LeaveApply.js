import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeaveApply.css'; 

import Login_1 from '../Images/Login_1.jpg';
import Login_2 from '../Images/Login_2.jpg';
import Login_3 from '../Images/Login_3.jpg';
import Login_4 from '../Images/Login_4.jpg';
import Login_5 from '../Images/Login_5.jpg';
import Login_6 from '../Images/Login_6.jpg';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Logo from '../Images/Logo.png';




import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom'

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Start() {

  const  Navigate= useNavigate();


  const reloadPage = () => {
    window.location.reload();  // Reloads the current page
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
        <Button onClick={()=>Navigate("./Login")} variant="btn btn-warning twinkle-button" className="mx-2 small-button main-button">Sign In</Button>
        <Button onClick={()=>Navigate("./Login")} variant="obtn btn-warning twinkle-button" className="mx-2 small-button main-button">Sign Up</Button>
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
        <div className="col-sm-12" style={{marginTop:"-8px" , padding:"0", marginLeft:"0" }}>
          <div className="p-1 mb-2 bg-success   bg-opacity-75  align-items-center justify-content-between">
          <div className="row " style={{marginRight:"0"}}>
            <div className="col-sm-2">
              <img src={Logo} className="fixed-logo img-fluid" alt="SL Army Logo" />
              
            </div>

      <div className="col-sm-9" >
      <div className="animated-text-container">
        <br/>
      <h1 className="display-1 large-text">WELCOME TO SMART - LEAVE</h1>

      

        
        <p className="sentence1" style={{ color: "#3e4551", fontWeight: "700", animation: "flyIn 2s ease-in-out", fontSize: "25px" }}>
          SRI LANKA ARMY
        </p>

        <p className="sentence2" style={{ color: "#ff5722", fontWeight: "60px", textDecorationLine: "overline",animation: "flyIn 3s ease-in-out", fontSize: "20px" }}>
          Defender of the Nature
        </p>


        
       </div> 

      </div>

{/* ................................Nav Bar........................... */}

<div className="col-sm-1">

  <button class="btn btn-success custom-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{width:"40px",height:"40px",marginRight:"0"}}>
  <div className="custom-icon">
          <div className="line"> </div>
          <div className="line"> </div>
          <div className="line"> </div>
  </div>
  </button>




    <div class="offcanvas offcanvas-end ustom-offcanvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header" >
        <h5 id="offcanvasRightLabel" style={{color:"white"}}>Welcome to Smart Leave!</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
       </div>
      <div class="offcanvas-body" >

      <ButtonGroup vertical >
      <Button onClick={reloadPage} variant="btn btn-outline-success" style={{color:"white", width:"300px"}}><i class="bi bi-house-door-fill"> </i>Home</Button>
      <Button onClick={()=>Navigate("./AboutUs")}variant="btn btn-outline-success" style={{color:"white" ,width:"300px"}}> <i class="bi bi-people-fill"> </i>About Us</Button>
      <Button  onClick={()=>Navigate("./ContactUs")} variant="btn btn-outline-success" style={{color:"white" ,width:"300px"}}><i class="bi bi-person-rolodex"> </i>Contact Us</Button>

      
    </ButtonGroup>
    
  </div>
</div>
</div>


      </div>
      </div>






    
  </div>
  </div>
</div>


{/* ........................For scroll down arrow ..........................................*/}





  {/* ..................................................................................................... */}
        {/* FOR CAROUSEL PICTURES */}

      <div className="row " >
        <div className="col-sm-12" style={{marginTop:"-8px", padding:"0"}}>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000"> {/* Enable auto cycling */}
            <div className="carousel-inner">
{/* ............................................................................. */}
              <div className="carousel-item active" >
                <div className="zoom">
                  <img src={Login_1} className="d-block w-100" alt="First slide" />

                  {/* Flexbox container to center the text */}
                  <div className="d-flex justify-content-center align-items-center position-absolute" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                     <h1 className="text-white bold-text an-army-text text-center">
                        <span className="fly-text fly-text-1 small-text"> LEAVE</span>
                        <br />
                        <span className="fly-text fly-text-2 big-text">MADE EASY!</span>

                        <div className="decorative-line">
                          <hr />
                        <div className="circle"/>
                        </div>
                        <span className='fly-text fly-text-1 small-text'style={{color:"white", textAlign:"center"}}>" At Smart Leave, we make leave management seamless, </span>
                       <br/>
                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>because leave should be straightforward and accessible." </span>
                    </h1>
                    </div>


                </div>
              </div>

{/* ............................................................................. */}
             <div className="carousel-item">
                <div className="zoom">
                  <img src={Login_2} className="d-block w-100" alt="Second slide" />
    
                    {/* Flexbox container to center the text */}
                    <div className="d-flex justify-content-center align-items-center position-absolute" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                     <h1 className="text-white bold-text an-army-text text-center">
                        <span className="fly-text fly-text-1 small-text">CONNECT WITH YOUR LEAVE</span>
                        <br />
                        <span className="fly-text fly-text-2 big-text">YOUR WELL-BEING MATTERS!</span>

                        <div className="decorative-line">
                          <hr />
                        <div className="circle"/>
                        </div>

                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>" At Smart Leave, we focus on making leave management effortless,</span>
                        <br/>
                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}> because we know your time matters. "</span>
                    </h1>
                    </div>

                </div>
              </div>

{/* ............................................................................. */}
              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_3} className="d-block " alt="Third slide" />

                  {/* Flexbox container to center the text */}
                  <div className="d-flex justify-content-center align-items-center position-absolute" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                     <h1 className="text-white bold-text an-army-text text-center">
                        <span className="fly-text fly-text-1 small-text">EXPERIENCE A SEAMLESS  LEAVE APPLY</span>
                        <br />
                        <span className="fly-text fly-text-2 big-text">FOR OUR BRAVE HEROES.</span>

                        <div className="decorative-line">
                          <hr />
                        <div className="circle"/>
                        </div>

                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>" At Smart Leave, we enhance the experience, </span>
                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>because we understand leave should be stress-free. "</span>
                    </h1>
                    </div>

                </div>
              </div>

{/* ............................................................................. */}
              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_4} className="d-block " alt="Fourth slide" />

                  {/* Flexbox container to center the text */}
                  <div className="d-flex justify-content-center align-items-center position-absolute" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                     <h1 className="text-white bold-text an-army-text text-center">
                        <span className="fly-text fly-text-1 small-text">YOUR LEAVE JOURNEY STARTS HERE.</span>
                        <br />
                        <span className="fly-text fly-text-2 big-text">QUICK, EASY, SECURE.</span>

                        <div className="decorative-line">
                          <hr />
                        <div className="circle"/>
                        </div>
                    
                    
                    
                      <span className='fly-text fly-text-1 small-text' style={{color:"white"}}> " At Smart Leave, we prioritize efficiency,  </span>
                      <br/>
                      <span className='fly-text fly-text-1 small-text' style={{color:"white"}}> because applying for leave should never be a hassle. " </span>
                    
                    </h1>
                    </div>

                </div>
              </div>

{/* ............................................................................. */}
              <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_5} className="d-block " alt="Fifth slide" />

                  {/* Flexbox container to center the text */}
                  <div className="d-flex justify-content-center align-items-center position-absolute" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                     <h1 className="text-white bold-text an-army-text text-center">
                        <span className="fly-text fly-text-1 small-text">TRACK YOUR LEAVE STATUS</span>
                        <br />
                        <span className="fly-text fly-text-2 big-text">ANYTIME, ANYWHERE.</span>

                        <div className="decorative-line">
                          <hr />
                        <div className="circle"/>
                        </div>

                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>"At Smart Leave, we innovate the way you manage time off,</span>
                        <br/>
                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>because leave should be straightforward and accessible." </span>
                    </h1>
                    </div>

                </div>
              </div>             

{/* ............................................................................. */}
            <div className="carousel-item" >
                <div className="zoom">
                  <img src={Login_6} className="d-block " alt="Sixth slide" />

                  {/* Flexbox container to center the text */}
                  <div className="d-flex justify-content-center align-items-center position-absolute" style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                     <h1 className="text-white bold-text an-army-text text-center">
                        <span className="fly-text fly-text-1 small-text">YOUR DUTY, YOUR LEAVE</span>
                        <br />
                        <span className="fly-text fly-text-2 big-text">APPLY WITH EASE.</span>

                        <div className="decorative-line">
                          <hr />
                        <div className="circle"/>
                        </div>

                        <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>"At Smart Leave, we streamline the process,</span>
                    <br/>
                    <span className='fly-text fly-text-1 small-text' style={{color:"white"}}>because managing leave should be simple and stress-free."</span>                    
                    </h1>
                    </div>

                </div>
              </div>         

{/* ............................................................................. */}




              </div>
              </div>
            
            </div>
         </div>




{/* ......................................................................................................................................................................................................... */}
         
 


  



{/* For Footer................................................ */}
<div className="row footer">

{/* <!-- Footer --> */}
<footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#3e4551' }}>

  {/* <!-- Grid container --> */}
  <div class="p-4 pb-0">
    {/* <!-- Section: Links --> */}
    <section class="">
      {/* <!--Grid row--> */}
      <div class="row">
        {/* <!--Grid column--> */}
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">FOOTER CONTENT</h5>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestiae modi cum ipsam ad, illo possimus laborum ut
            reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
            Reiciendis assumenda iusto sapiente inventore animi?
          </p>
        </div>
        {/* <!--Grid column--> */}

        {/* <!--Grid column--> */}
        <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Links</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a href="#!" class="text-white">Link 1</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 2</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 3</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 4</a>
            </li>
          </ul>
        </div>
        {/* <!--Grid column--> */}

        {/* <!-- Repeat the grid columns for more links... --> */}

      </div>
      {/* <!--Grid row--> */}
    </section>
    {/* <!-- Section: Links --> */}

    <hr class="mb-4" />

    {/* <!-- Section: CTA --> */}
    <section class="">
      <p class="d-flex justify-content-center align-items-center">
        <span class="me-3">Register for free</span>
        <button type="button" class="btn btn-outline-light btn-rounded">
          Sign up!
        </button>
      </p>
    </section>
    {/* <!-- Section: CTA --> */}

    <hr class="mb-4" />

    {/* <!-- Section: Social media --> */}
    <section class="mb-4 text-center">
      {/* <!-- Facebook --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-facebook-f"></i
        ></a>

      {/* <!-- Twitter --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-twitter"></i
        ></a>

      {/* <!-- Google --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-google"></i
        ></a>

      {/* <!-- Instagram --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-instagram"></i
        ></a>

      {/* <!-- Linkedin --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-linkedin-in"></i
        ></a>

      {/* <!-- Github --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-github"></i
        ></a>
    </section>
    {/* <!-- Section: Social media --> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div className="container-fluid p-0">
  <div
       className="text-center p-3"
       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}

       >
    © 2024 Copyright :
    <a class="text-white" href="Start/">
      smartLeave.com</a>
  </div>
  </div>
  {/* <!-- Copyright --> */}
</footer>
{/* <!-- Footer --> */}


</div>

 


</div>


      

  )
}