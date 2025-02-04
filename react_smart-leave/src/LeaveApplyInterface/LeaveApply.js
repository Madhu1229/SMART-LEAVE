import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeaveApply.css'; 
import NavBar from '../Pages/NavBar';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';

// ..............................................................................................................

export default function LeaveApplyForm() {


  const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message
    const navigate = useNavigate(); // Create navigate function
  
    function logout() {
      localStorage.removeItem('token');
      setLogoutMessage('You have been logged out successfully.'); // Set the logout message
      setTimeout(() => {
        window.location.href = '/'; // Redirect to the login page after 3 seconds
      }, 3000); // Delay the redirect for 3 seconds to show the message
    }
    

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    subDesignation: '',
    ministry: '',
    leaveDaysC: '',
    leaveDaysV: '',
    leaveDaysO: '',
    leaveTakenC: '',
    leaveTakenV: '',
    leaveTakenO: '',
    date: null,
    firstAppointmentDate: null,
    commenceLeaveDate: null,
    resumeDutiesDate: null,
    reasonForLeave: '',
    applicantSignature: null,
    officerActingName: '',
    officerActingSignature: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameRef = useRef();
  const designationRef = useRef();
  const subDesignationRef = useRef();
  const  ministryRef= useRef();
  const  leaveDaysCRef= useRef();
  const  leaveDaysVRef= useRef();
  const  leaveDaysORef= useRef();
  const  leaveTakenCRef= useRef();
  const  leaveTakenVRef= useRef();
  const  leaveTakenORef= useRef();
  const  dateRef= useRef();
  const  firstAppointmentDateRef= useRef();
  const  commenceLeaveDateRef= useRef();
  const  resumeDutiesDateRef= useRef();
  const  reasonForLeaveRef= useRef();
  const  applicantSignatureRef= useRef();
  const  officerActingNameRef= useRef();
  const  officerActingSignatureRef= useRef();
  

  const designationOptions = {
    'Commissioned officers': [
      'General / Flag Officers',
      'Senior Officers',
      'Junior Officers',
      'Senior NCOs',
      'Junior NCOs',
      'Enlisted'
    ],
    'Non Commissioned officers & enlisted personnel': [
      'Warrant officer class I',
      'Warrant officer class II',
      'Staff sergeant',
      'Sergeant',
      'Corporal / Bombardier',
      'Lance corporal / Lance bombardier',
      'Private'
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    let firstErrorField = null;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      if (!firstErrorField) firstErrorField = nameRef;
    }
    if (!formData.designation) {
      newErrors.designation = "Designation is required.";
      if (!firstErrorField) firstErrorField = designationRef;
    }
    if (!formData.subDesignation) {
      newErrors.subDesignation = "Sub Designation is required.";
      if (!firstErrorField) firstErrorField = subDesignationRef;

     } if (!formData.ministry) {
      newErrors.ministry = "Ministry is required.";
      if (!firstErrorField) firstErrorField = ministryRef;
    }
    if (!formData.leaveDaysC) {
      newErrors.leaveDaysC = "Leave Days (C) is required.";
      if (!firstErrorField) firstErrorField = leaveDaysCRef;
    }
    if (!formData.leaveDaysV) {
      newErrors.leaveDaysV = "Leave Days (V) is required.";
      if (!firstErrorField) firstErrorField = leaveDaysVRef;
    }
    if (!formData.leaveDaysO) {
      newErrors.leaveDaysO = "Leave Days (O) is required.";
      if (!firstErrorField) firstErrorField = leaveDaysORef;
    }
    if (!formData.leaveTakenC) {
      newErrors.leaveTakenC = "Leave Taken (O) is required.";
      if (!firstErrorField) firstErrorField = leaveTakenCRef;
    }
    if (!formData.leaveTakenV) {
      newErrors.leaveTakenV = "Leave Taken (V) is required.";
      if (!firstErrorField) firstErrorField = leaveTakenVRef;
    }
    if (!formData.leaveTakenO) {
      newErrors.leaveTakenO = "Leave Taken (O) is required.";
      if (!firstErrorField) firstErrorField = leaveTakenORef;
    }
    if (!formData.date) {
      newErrors.date = "Date is required.";
      if (!firstErrorField) firstErrorField = dateRef;
    }
    
    if (!formData.firstAppointmentDate) {
      newErrors.firstAppointmentDate = "First Appointment Date is required.";
      if (!firstErrorField) firstErrorField = firstAppointmentDateRef;
    }
    
    if (!formData.reasonForLeave) {
      newErrors.reasonForLeave = "Reason For Leave is required.";
      if (!firstErrorField) firstErrorField = reasonForLeaveRef;
    }
    
    if (!formData.applicantSignature) {
      newErrors.applicantSignature = "Applicant Signature is required.";
      if (!firstErrorField) firstErrorField = applicantSignatureRef;
    }
    
    if (!formData.officerActingName) {
      newErrors.officerActingName = "Officer Acting Name is required.";
      if (!firstErrorField) firstErrorField = officerActingNameRef;
    }
      if (!formData.commenceLeaveDate) {
      newErrors.commenceLeaveDate = "Commencement leave date is required.";
      if (!firstErrorField) firstErrorField = commenceLeaveDateRef;
    }
    if (!formData.officerActingSignature) {
      newErrors.officerActingSignature = "officer Acting Signature  is required.";
      if (!firstErrorField) firstErrorField = officerActingSignatureRef;
    }
    if (!formData.resumeDutiesDate) {
      newErrors.resumeDutiesDate = "Resume Duties DateRef  is required.";
      if (!firstErrorField) firstErrorField = resumeDutiesDateRef;
    }
    

    setErrors(newErrors);

    if (firstErrorField) firstErrorField.current.focus();

    return Object.keys(newErrors).length === 0;
  };

  const handleFormReset = () => {
    setFormData({
      name: '',
      designation: '',
      subDesignation: '',
      ministry: '',
      leaveDaysC: '',
      leaveDaysV: '',
      leaveDaysO: '',
      leaveTakenC: '',
      leaveTakenV: '',
      leaveTakenO: '',
      date: null,
      firstAppointmentDate: null,
      commenceLeaveDate: null,
      resumeDutiesDate: null,
      reasonForLeave: '',
      applicantSignature: null,
      officerActingName: '',
      officerActingSignature: null,
      comments: '',
    });
    setErrors({});

      // Clear file inputs
      if (applicantSignatureRef.current) {
        applicantSignatureRef.current.value = '';
      }
      if (officerActingSignatureRef.current) {
        officerActingSignatureRef.current.value = '';
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();

      data.append('name', formData.name);
      data.append('designation', formData.designation);
      data.append('subDesignation', formData.subDesignation);
      data.append('ministry', formData.ministry);
      data.append('leaveDaysC', formData.leaveDaysC);
      data.append('leaveDaysV', formData.leaveDaysV);
      data.append('leaveDaysO', formData.leaveDaysO);
      data.append('leaveTakenC', formData.leaveTakenC);
      data.append('leaveTakenV', formData.leaveTakenV);
      data.append('leaveTakenO', formData.leaveTakenO);
      data.append('date', formData.date);
      data.append('firstAppointmentDate', formData.firstAppointmentDate);
      data.append('commenceLeaveDate', formData.commenceLeaveDate);
      data.append('resumeDutiesDate', formData.resumeDutiesDate);
      data.append('reasonForLeave', formData.reasonForLeave);
      data.append('officerActingName', formData.officerActingName);

      if (formData.applicantSignature) data.append('applicantSignature', formData.applicantSignature);
      if (formData.officerActingSignature) data.append('officerActingSignature', formData.officerActingSignature);

      axios.post('http://localhost:8093/Member_LeaveApplicant/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          alert('Leave Apply Successful!');
          handleFormReset();
        })
        .catch((err) => {
          if (err.response) {
            alert(`Error: ${JSON.stringify(err.response.data)}`);
          } else {
            alert('Error submitting form. Please try again.');
          }
        });
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

// .........................................................................................................................................................................................................

return (
<div className="container-fluid p-0">
      
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
            <Button onClick={()=>navigate("/Login")} variant="btn btn-warning twinkle-button" className="mx-2 small-button main-button">Sign In</Button>
            <Button onClick={logout} variant="warning" className="mx-2 small-button main-button">Log Out</Button>
            
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
    <NavBar/>  

    {/* Log out message............... */}
      {logoutMessage && (
  <div className="alert alert-success" role="alert">
    {logoutMessage}
  </div>
)}
   

{/*. ..................................................................................................... */}

{/* FOR FORM */}
    <div className="container mt-5" action="/Member_LeaveApplicant/add" method="POST" enctype="multipart/form-data">
      <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>Application For Leave</h2>
      <Form onSubmit={handleSubmit}>
      {isSubmitted && <div className="text-success">Form Submitted Successfully!</div>}
        <Row>
          {/* First Column */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label style={{ color: '#4CAF50' }}>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                ref={nameRef}
                style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="designation">
        <Form.Label style={{ color: '#4CAF50' }}>Designation</Form.Label>
        <Form.Select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          ref={designationRef}
          style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }}
          required
        >
          <option value="">Select...</option>
          <option>Commissioned officers</option>
          <option>Non Commissioned officers & enlisted personnel</option>
        </Form.Select>
      </Form.Group>

      {/* Designation Sub-levels */}
      <Form.Group className="mb-3" controlId="subDesignation">
        <Form.Label style={{ color: '#4CAF50' }}>Sub Designation</Form.Label>
        <Form.Select
          name="subDesignation"
          value={formData.subDesignation}
          onChange={handleChange}
          ref={subDesignationRef}
          style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }}
          required
          disabled={!formData.designation} // Disable if no designation is selected
        >
          <option value="">Choose sub designation</option>
          {formData.designation &&
            designationOptions[formData.designation].map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

            {/* Ministry / Department */}
            <Form.Group className="mb-3" controlId="ministry">
              <Form.Label style={{ color: '#4CAF50' }}>Ministry / Department</Form.Label>
              <Form.Control 
                type="text" 
                name="ministry" 
                value={formData.ministry}
                onChange={handleChange}
                ref={ministryRef}
                style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                required
              />
            </Form.Group>

            {/* Number of Days Leave */}
            <Form.Group className="mb-3" controlId="leaveDays">
              <Form.Label style={{ color: '#4CAF50' }}>Number of Days Leave Applied For (C, V, O)</Form.Label>
              <Row>
                <Col>
                  <Form.Control 
                    placeholder="C" 
                    name="leaveDaysC"
                    value={formData.leaveDaysC}
                    onChange={handleChange}
                    ref={leaveDaysCRef}
                    style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                    required
                  />
                </Col>
                <Col>
                  <Form.Control 
                    placeholder="V" 
                    name="leaveDaysV"
                    value={formData.leaveDaysV}
                    onChange={handleChange}
                    ref={leaveDaysVRef}
                    style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                    required
                  />
                </Col>
                <Col>
                  <Form.Control 
                    placeholder="O" 
                    name="leaveDaysO"
                    value={formData.leaveDaysO}
                    onChange={handleChange}
                    ref={leaveDaysORef}
                    style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                    required
                  />
                </Col>
              </Row>
            </Form.Group>

            {/* Leave Taken in Current Year */}
            <Form.Group className="mb-3" controlId="leaveTaken">
              <Form.Label style={{ color: '#4CAF50' }}>Leave Taken (Current Year, C, V, O)</Form.Label>
              <Row>
                <Col>
                  <Form.Control 
                    placeholder="C" 
                    name="leaveTakenC"
                    value={formData.leaveTakenC}
                    onChange={handleChange}
                    ref={leaveTakenCRef}
                    style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                    required
                  />
                </Col>
                <Col>
                  <Form.Control 
                    placeholder="V" 
                    name="leaveTakenV"
                    value={formData.leaveTakenV}
                    onChange={handleChange}
                    ref={leaveTakenVRef}
                    style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                    required
                  />
                </Col>
                <Col>
                  <Form.Control 
                    placeholder="O" 
                    name="leaveTakenO"
                    value={formData.leaveTakenO}
                    onChange={handleChange}
                    ref={leaveTakenORef}
                    style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                    required
                  />
                </Col>
              </Row>
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstAppointmentDate">
                <Form.Label style={{ color: '#4CAF50' }}>Date of First Appointment</Form.Label>
                <br/>
                <DatePicker
                  selected={formData.firstAppointmentDate}
                  onChange={(date) => handleDateChange(date,'firstAppointmentDate')}
                  ref={firstAppointmentDateRef}
                  className="form-control"
                  style={{ borderColor: '#4CAF50', backgroundColor: '#3e455', color: '#fff' }}
                   dateFormat="MM/dd/yyyy" // Optional: format the date display
                   placeholderText="Select a date"
                  required
                />
              </Form.Group>

            
          </Col>

          {/* Second Column */}
          <Col md={6}>
           

            <Form.Group className="mb-3" controlId="commenceLeaveDate">
            <Form.Label style={{ color: '#4CAF50' }}>Date of Commencing Leave</Form.Label>
                <br/>
                <DatePicker
                  selected={formData.commenceLeaveDate}
                  onChange={(date) => handleDateChange(date,'commenceLeaveDate')}
                  ref={commenceLeaveDateRef}
                  className="form-control"
                  style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }}
                  dateFormat="MM/dd/yyyy" // Optional: format the date display
                  placeholderText="Select a date"
                  required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="resumeDutiesDate">
              <Form.Label style={{ color: '#4CAF50' }}>Date of Resuming Duties</Form.Label>
              <br/>
              <DatePicker
                  selected={formData.resumeDutiesDate}
                  onChange={(date) => handleDateChange(date,'resumeDutiesDate')}
                  ref={resumeDutiesDateRef}
                  className="form-control"
                  style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }}
                  dateFormat="MM/dd/yyyy" // Optional: format the date display
                   placeholderText="Select a date"
                  required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reasonForLeave">
              <Form.Label style={{ color: '#4CAF50' }}>Reasons for Leave</Form.Label>
              <Form.Control 
                type="text" 
                name="reasonForLeave"
                value={formData.reasonForLeave}
                ref={reasonForLeaveRef}
                onChange={handleChange}
                style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                required
              />
            </Form.Group>

            {/* Applicant Signature */}
            <Form.Group className="mb-3" controlId="applicantSignature">
              <Form.Label style={{ color: '#4CAF50' }}>Applicant's Signature</Form.Label>
              <Form.Control 
                type="file" 
                name="applicantSignature"
                onChange={handleFileChange}
                ref={applicantSignatureRef}
                style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                required
              />
            </Form.Group>

            {/* Officer Acting Name */}
            <Form.Group className="mb-3" controlId="officerActingName">
              <Form.Label style={{ color: '#4CAF50' }}>Name of Officer Acting During Leave</Form.Label>
              <Form.Control 
                type="text" 
                name="officerActingName"
                value={formData.officerActingName}
                ref={officerActingNameRef}
                onChange={handleChange}
                style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                required
              />
            </Form.Group>

            {/* Officer Acting Signature */}
            <Form.Group className="mb-3" controlId="officerActingSignature">
              <Form.Label style={{ color: '#4CAF50' }}>Officer's Signature</Form.Label>
              <Form.Control 
                type="file" 
                name="officerActingSignature"
                onChange={handleFileChange}
                ref={officerActingSignatureRef}
                style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
                required
              />
            </Form.Group>



            {/* Date */}
            <Form.Group className="mb-3" controlId="date">
            <Form.Label style={{ color: '#4CAF50' }}>Date</Form.Label>
              <br/>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleDateChange(date,'date')}
                className="form-control"
                ref={dateRef}
                style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }}
                dateFormat="MM/dd/yyyy" // Optional: format the date display
                placeholderText="Select a date"
                required
              />
            </Form.Group>

          </Col>
        </Row>

        <div className="text-center">
          <Button 
            variant="success" 
            type="submit" 
            
            style={{ fontSize: '20px', width: '50%' }}
          >
            Leave Apply
          </Button>


        {/* Add the comment box
        {Object.keys(errors).length > 0 && (
          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'red' }}>Comments</Form.Label>
            <Form.Control 
              type="text" 
              name="comments" 
              value={formData.comments} 
              onChange={handleChange}
              style={{ borderColor: '#4CAF50', backgroundColor: '#3e4551', color: '#fff' }} 
              placeholder="Please explain the missing fields" 
            />
          </Form.Group>
        )} */}


        </div>

      </Form>


      {/* Conditionally show the success message
      {handleSubmit && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          borderRadius: '5px',
          width: 'fit-content',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          Your Leave Application is successfully submitted!
        </div>
      )} */}
    </div>
         
{/*.......................................................For Footer................................................ */}

 <Footer/>

{/* ................................................................................................................ */}

</div>   

  )
}