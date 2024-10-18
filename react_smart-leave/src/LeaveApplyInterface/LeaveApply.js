import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeaveApply.css'; 
import NavBar from '../Pages/NavBar';


// For Form

import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; // Install this package for date selection
import 'react-datepicker/dist/react-datepicker.css';

//For Icons
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';

// ..............................................................................................................................................................................................

export default function Start() {

  const  Navigate= useNavigate();


// ...............................................................................................................................................................................................
// For Form 

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
    comments: '', // Comment field
});



const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

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

const [errors, setErrors] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

const nameRef = useRef();
const designationRef = useRef();
const ministryRef = useRef();
const commentsRef = useRef();


const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
};

const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
};

// Validation logic for form submission
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
    if (!formData.ministry) {
        newErrors.ministry = "Ministry is required.";
        if (!firstErrorField) firstErrorField = ministryRef;
    }
    if (!formData.comments) {
        newErrors.comments = "Comments are required.";
        if (!firstErrorField) firstErrorField = commentsRef;
    }
    // Validate date fields if needed
    if (!formData.commenceLeaveDate) {
        newErrors.commenceLeaveDate = "Commencement leave date is required.";
        if (!firstErrorField) firstErrorField = null; // Adjust to your ref if you have one
    }
    if (!formData.resumeDutiesDate) {
        newErrors.resumeDutiesDate = "Resume duties date is required.";
        if (!firstErrorField) firstErrorField = null; // Adjust to your ref if you have one
    }

setErrors(newErrors);
// Focus the cursor on the first field with an error
if (firstErrorField) firstErrorField.current.focus();
  return Object.keys(newErrors).length === 0; // Return true if no errors
};




// Handle form submission
const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Proceed with form submission logic (e.g., send to an API)
        console.log("Form data submitted:", formData);
        alert("Form submitted successfully!");

        // Reset the form after submission (optional)
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
            comments: '', // Comment field
        });
        setErrors({});
    } else {
        alert("Please fill in the required fields.");
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
    <NavBar/>     

{/*. ..................................................................................................... */}

{/* FOR FORM */}
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>Application For Leave</h2>
      <Form>
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
                  selected={formData.commenceLeaveDate}
                  onChange={(date) => handleDateChange(date,'commenceLeaveDate')}
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


        {/* Add the comment box */}
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
        )}


        </div>

      </Form>


      {/* Conditionally show the success message */}
      {isSubmitted && (
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
      )}
    </div>
         
{/*.......................................................For Footer................................................ */}

 <Footer/>

{/* ................................................................................................................ */}

</div>   

  )
}