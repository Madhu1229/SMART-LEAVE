import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Start.css'; 


import Login_1 from '../Images/Login_1.jpg';
import Login_2 from '../Images/Login_2.jpg';
import Login_3 from '../Images/Login_3.jpg';
import Login_4 from '../Images/Login_4.jpg';
import Login_5 from '../Images/Login_5.jpg';
import Login_6 from '../Images/Login_6.jpg';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Logo from '../Images/Logo.png';

import StartVideo from '../Videos/StartVideo.mp4'; 


import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom'

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Footer from './Footer';
import NavBar from './NavBar';


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
</div>




{/* Nav Bar 1 */}

<NavBar/>

{/* FOR StartVideo  */}

<div className="row mt-4" >
  <div className="col-sm-12 mainVideo" style={{ marginTop: '-32px', padding: '0' }}>
    <video width="100%" height="auto" autoPlay loop muted >
      <source src={StartVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>
      



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


{/*............................ For Footer................................................ */}
    <Footer/>

</div>   

  )
}