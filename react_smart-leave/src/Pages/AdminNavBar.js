import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Images/Logo.png';
import './NavBar.css';

export default function AdminNavBar() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="admin-navbar">
      <Container fluid className="navbar-container px-0">
        {/* Logo and title container */}
        <div className="logo-title-wrapper">
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img 
              src={Logo} 
              className="navbar-logo zoom-bounce-middle" 
              alt="SL Army Logo" 
            />
            <h5 className="welcome-title zoom-bounce-middle">SMART - LEAVE</h5>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="admin-navbar" className="navbar-toggle" />
        
        <Navbar.Collapse id="admin-navbar">
          <Nav className="nav-links-container mx-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">Home</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/DashBoard" 
              className={`nav-link-item ${location.pathname === '/DashBoard' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">Dashboard</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/NewMember" 
              className={`nav-link-item ${location.pathname === '/NewMember' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">New Member</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/ViewMembers" 
              className={`nav-link-item ${location.pathname === '/ViewMembers' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">View Members</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/LeaveApplicant" 
              className={`nav-link-item ${location.pathname === '/LeaveApplicant' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">View Leave Applicant</span>
            </Nav.Link>
            
            {/* <Nav.Link 
              as={Link} 
              to="/Notifications" 
              className={`nav-link-item ${location.pathname === '/Notifications' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">Notices</span>
            </Nav.Link> */}
            
            <Nav.Link 
              as={Link} 
              to="/ContactUs" 
              className={`nav-link-item ${location.pathname === '/ContactUs' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">Contact Us</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}