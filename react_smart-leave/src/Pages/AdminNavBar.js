import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo.png';

export default function NavBar() {
  return (
    <div className="row p-0" style={{ marginTop: "-8px", padding: "0" }}>
      <Navbar 
        expand="lg" 
        className="custom-navbar" 
        variant="dark"
        style={{ backgroundColor: "#022B23", opacity: "0.9" }} // Background color updated
      >
        <div className="Container">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto navbar1">
              <div className="content-wrapper">
                <img src={Logo} className="fixed-logo img-fluid" style={{ alignItems: "center" }} alt="SL Army Logo" />
                
                <div className="large-text1">
                  <h5 className="title">Welcome to SMART - LEAVE</h5>
                </div>

                <p className="sentence1" style={{ color: "green", fontWeight: "100px", animation: "flyIn 2s ease-in-out", fontSize: "14px", marginLeft: "5px" }}>
                  SRI LANKA ARMY
                </p>

                <p className="sentence2" style={{ color: "#ff5722", fontWeight: "20px", textDecorationLine: "overline", animation: "flyIn 3s ease-in-out", fontSize: "12px" }}>
                  Defender of the Nature
                </p>
              </div>

              <Nav.Link as={Link} to="/" className="customize-btn">Home</Nav.Link>
              <Nav.Link as={Link} to="/DashBoard" className="customize-btn">DashBoard</Nav.Link>
              <Nav.Link as={Link} to="/NewMember" className="customize-btn">NewMember</Nav.Link>
              <Nav.Link as={Link} to="/ViewMembers" className="customize-btn">ViewMembers</Nav.Link>
              <Nav.Link as={Link} to="/LeaveApplicant" className="customize-btn">LeaveApplicant</Nav.Link>
              <Nav.Link as={Link} to="/Notifications" className="customize-btn">Notices</Nav.Link>
              <Nav.Link as={Link} to="/ContactUs" className="customize-btn">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}
