import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Container, Row, Col, Card, Table, Image, Form, Button } from 'react-bootstrap';




import DatePicker from 'react-datepicker'; // Install this package for date selection
import 'react-datepicker/dist/react-datepicker.css';

import Login_1 from '../Images/Login_1.jpg';
import Login_2 from '../Images/Login_2.jpg';
import Login_3 from '../Images/Login_3.jpg';
import Login_4 from '../Images/Login_4.jpg';
import Login_5 from '../Images/Login_5.jpg';
import Login_6 from '../Images/Login_6.jpg';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Logo from '../Images/Logo.png';

import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios'; // You can use Fetch API as well
import {Link, useNavigate} from 'react-router-dom'

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Start() {

//   const  Navigate= useNavigate();


//   const reloadPage = () => {
//     window.location.reload();  // Reloads the current page
//   };


// .........................................................
  

const [user, setUser] = useState(null); // Initial state as null to show loading spinner
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user-profile'); // Replace with your actual API endpoint
        setUser(response.data); // Assuming data contains user object
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Even if there's an error, stop loading
      }
    };

    fetchUserData();
  }, []);

  // Handle profile photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePhoto(e.target.result); // Set the image URL for display
      setUser({ ...user, photo: e.target.result }); // Temporarily update user state with uploaded photo
    };
    if (file) {
      reader.readAsDataURL(file); // Read file as data URL for preview
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!user) {
    return <Container><p>No user data found.</p></Container>;
  }


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


{/* .............Nav Bar............... */}

<div className="row" p-0 style={{marginTop:"-8px", padding:"0"}}>
<Navbar expand="lg" className="custom-navbar" variant="dark">
      <div className='Container'>
        <Navbar.Brand href="#home"></Navbar.Brand>

      

<Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto navbar1">
          <div className="content-wrapper ">
            {/* Add the image below the text */}
      <img src={Logo} className="fixed-logo img-fluid" alt="SL Army Logo" />
      <div className="large-text1">
      <h4 className="title">Welcome to SMART - LEAVE</h4> {/* Add the words above */}
      </div>
      
    </div>
          
          
          
          <Nav.Link as={Link} to="/" className="customize-btn">Home</Nav.Link>
          <Nav.Link as={Link} to="/AboutUs" className="customize-btn">About Us</Nav.Link>
          <Nav.Link as={Link} to="/LeaveProfile" className="customize-btn">Leave Profile</Nav.Link>
          <Nav.Link as={Link} to="/LeaveApply" className="customize-btn">Apply Leave</Nav.Link>
          <Nav.Link as={Link} to="/LeaveStatus" className="customize-btn">Leave Status</Nav.Link>
          <Nav.Link as={Link} to="/Notifications" className="customize-btn">Notifications</Nav.Link>
          <Nav.Link as={Link} to="/ContactUs" className="customize-btn">Contact Us</Nav.Link>
            <br/><br/>
            
          </Nav>
        </Navbar.Collapse>
        </div>
        </Navbar>
    </div>


    {/* ................... */}








    

  



{/* ........................For scroll down arrow ..........................................*/}





  {/* ..................................................................................................... */}
        






{/* ......................For ................................................................................................................................................................................... */}
<Container fluid className="p-4">
      {/* User Profile Section */}
      <Row className="mb-4">
        <Col md={3} xs={12} className="d-flex justify-content-center">
          <Image 
            src={user.photo || profilePhoto || 'default_profile_photo_url'} // Show fetched or uploaded photo, or default
            roundedCircle width="150" height="150" alt="User Profile"
          />
        </Col>
        <Col md={9} xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>
                <strong>Designation: </strong> {user.designation} <br />
                <strong>Date of First Appointment: </strong> {user.firstAppointment}
              </Card.Text>
              {/* Photo Upload Form */}
              <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Profile Photo</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handlePhotoUpload} />
                </Form.Group>
                {profilePhoto && (
                  <Button variant="primary" onClick={() => alert('Photo uploaded successfully!')}>
                    Save Photo
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Leave Summary Section */}
      <Row className="mb-4">
        <Col md={4} xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>Annual Leave</Card.Title>
              <Card.Text>{user.leaveBalance.annual} days remaining</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>Sick Leave</Card.Title>
              <Card.Text>{user.leaveBalance.sick} days remaining</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>Maternity/Paternity Leave</Card.Title>
              <Card.Text>{user.leaveBalance.maternity} days remaining</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upcoming Leaves */}
      <Row className="mb-4">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Leaves</Card.Title>
              {user.upcomingLeaves.length > 0 ? (
                user.upcomingLeaves.map((leave, index) => (
                  <Card.Text key={index}>
                    <strong>Type:</strong> {leave.type} <br />
                    <strong>From:</strong> {leave.start} <br />
                    <strong>To:</strong> {leave.end} <br />
                    <strong>Status:</strong> {leave.status}
                  </Card.Text>
                ))
              ) : (
                <Card.Text>No upcoming leaves.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Leave History Table */}
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>Leave History</Card.Title>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th>Duration (Days)</th>
                  </tr>
                </thead>
                <tbody>
                  {user.leaveHistory.map((leave, index) => (
                    <tr key={index}>
                      <td>{leave.type}</td>
                      <td>{leave.start}</td>
                      <td>{leave.end}</td>
                      <td>{leave.status}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>



                

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