// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Nav } from 'react-bootstrap';
// import './NavBar.css';
// import { Link } from 'react-router-dom';
// import Logo from '../Images/Logo.png';

// export default function NavBar() {
//   return (
//     <div className="row p-0" style={{ marginTop: "-8px", padding: "0" }}>
//       <Navbar 
//         expand="lg" 
//         className="custom-navbar" 
//         variant="dark"
//         style={{ backgroundColor: "#022B23", opacity: "0.9" }} // Background color updated
//       >
//         <div className="Container">
//           <Navbar.Brand href="#home"></Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ml-auto navbar1">
//               <div className="content-wrapper">
//                 <img src={Logo} className="fixed-logo img-fluid" style={{ alignItems: "center" }} alt="SL Army Logo" />
                
//                 <div className="large-text1">
//                   <h5 className="title">Welcome to SMART - LEAVE</h5>
//                 </div>

//                 <p className="sentence1" style={{ color: "green", fontWeight: "100px", animation: "flyIn 2s ease-in-out", fontSize: "14px", marginLeft: "5px" }}>
//                   SRI LANKA ARMY
//                 </p>

//                 <p className="sentence2" style={{ color: "#ff5722", fontWeight: "20px", textDecorationLine: "overline", animation: "flyIn 3s ease-in-out", fontSize: "12px" }}>
//                   Defender of the Nature
//                 </p>
//               </div>

//               <Nav.Link as={Link} to="/" className="customize-btn">Home</Nav.Link>
//               <Nav.Link as={Link} to="/AboutUs" className="customize-btn">About Us</Nav.Link>
//               <Nav.Link as={Link} to="/LeaveProfile" className="customize-btn">Leave Profile</Nav.Link>
//               <Nav.Link as={Link} to="/LeaveApply" className="customize-btn">Apply Leave</Nav.Link>
//               <Nav.Link as={Link} to="/LeaveStatus" className="customize-btn">Leave Status</Nav.Link>
//               <Nav.Link as={Link} to="/Notifications" className="customize-btn">Notices</Nav.Link>
//               <Nav.Link as={Link} to="/ContactUs" className="customize-btn">Contact Us</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </div>
//       </Navbar>
//     </div>
//   );
// }


import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Images/Logo.png';
import './NavBar.css';

export default function AdminNavBar() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="navbar">
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

        <Navbar.Toggle aria-controls="navbar" className="navbar-toggle" />
        
        <Navbar.Collapse id="navbar">
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
              to="/AboutUs" 
              className={`nav-link-item ${location.pathname === '/AboutUs' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">About Us</span>
            </Nav.Link>
            
            {/* <Nav.Link 
              as={Link} 
              to="/NewMember" 
              className={`nav-link-item ${location.pathname === '/LeaveProfile' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">Leave Profile</span>
            </Nav.Link> */}
            
            <Nav.Link 
              as={Link} 
              to="/LeaveApply" 
              className={`nav-link-item ${location.pathname === '/LeaveApply' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">Leave Apply</span>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/LeaveStatus" 
              className={`nav-link-item ${location.pathname === '/LeaveStatus' ? 'active' : ''}`}
            >
              <span className="link-top"></span>
              <span className="link-text">Leave Status</span>
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
