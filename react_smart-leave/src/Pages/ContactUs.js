import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';
import {Button } from 'react-bootstrap';
import NavBar from './NavBar';
import Footer from './Footer';

import 'react-datepicker/dist/react-datepicker.css';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import { Navigate } from 'react-router-dom';

export default function Start() {



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


{/* ....................Nav Bar............................. */}
    <NavBar/>

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
    <Footer/>


</div>

  )
}