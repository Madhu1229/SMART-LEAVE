import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Start.css'; 

import './LoginIcon.css';


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
import HomeNavBar from './HomeNavBar';


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

<HomeNavBar/>

{/* FOR StartVideo  */}

<div className="row mt-4" >
  <div className="col-sm-12 mainVideo" style={{ marginTop: '-32px', padding: '0' }}>
    <video width="100%" height="auto" autoPlay loop muted >
      <source src={StartVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>
      



{/*............................ For Footer................................................ */}
    <Footer/>

</div>   

  )
}