import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeaveApply.css'; 
import NavBar from '../Pages/NavBar';
import axios from 'axios';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';
import SignatureCanvas from 'react-signature-canvas';
import MainTitle from '../Pages/MainTitle';

export default function LeaveApplyForm() {
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();
  
  function logout() {
    localStorage.removeItem('token');
    setLogoutMessage('You have been logged out successfully.');
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
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
    date: '',
    firstAppointmentDate: '',
    commenceLeaveDate: '',
    resumeDutiesDate: '',
    reasonForLeave: '',
    applicantSignature: null,
    officerActingName: '',
    officerActingSignature: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Refs for signature canvases
  const sigCanvasApplicant = useRef();
  const sigCanvasOfficer = useRef();

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Updated date handling to store as YYYY-MM-DD strings
  const handleDateChange = (date, field) => {
    if (!date) {
      setFormData(prev => ({ ...prev, [field]: '' }));
      return;
    }
    
    // Format date as YYYY-MM-DD to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    setFormData(prev => ({ ...prev, [field]: dateString }));
  };

  // Convert date string back to Date object for DatePicker
  const parseDateString = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
  };

  // Clear signatures
  const clearApplicantSignature = () => {
    sigCanvasApplicant.current.clear();
    setFormData(prev => ({ ...prev, applicantSignature: null }));
  };

  const clearOfficerSignature = () => {
    sigCanvasOfficer.current.clear();
    setFormData(prev => ({ ...prev, officerActingSignature: null }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.subDesignation) newErrors.subDesignation = "Sub Designation is required";
    if (!formData.ministry.trim()) newErrors.ministry = "Ministry is required";
    if (!formData.leaveDaysC) newErrors.leaveDaysC = "Leave Days (C) is required";
    if (!formData.leaveDaysV) newErrors.leaveDaysV = "Leave Days (V) is required";
    if (!formData.leaveDaysO) newErrors.leaveDaysO = "Leave Days (O) is required";
    if (!formData.leaveTakenC) newErrors.leaveTakenC = "Leave Taken (C) is required";
    if (!formData.leaveTakenV) newErrors.leaveTakenV = "Leave Taken (V) is required";
    if (!formData.leaveTakenO) newErrors.leaveTakenO = "Leave Taken (O) is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.firstAppointmentDate) newErrors.firstAppointmentDate = "First Appointment Date is required";
    if (!formData.commenceLeaveDate) newErrors.commenceLeaveDate = "Commencement date is required";
    if (!formData.resumeDutiesDate) newErrors.resumeDutiesDate = "Resume date is required";
    if (!formData.reasonForLeave.trim()) newErrors.reasonForLeave = "Reason is required";
    if (!formData.applicantSignature) newErrors.applicantSignature = "Applicant signature is required";
    if (!formData.officerActingName.trim()) newErrors.officerActingName = "Officer name is required";
    if (!formData.officerActingSignature) newErrors.officerActingSignature = "Officer signature is required";

    setErrors(newErrors);
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
      date: '',
      firstAppointmentDate: '',
      commenceLeaveDate: '',
      resumeDutiesDate: '',
      reasonForLeave: '',
      applicantSignature: null,
      officerActingName: '',
      officerActingSignature: null,
    });
    setErrors({});
    sigCanvasApplicant.current?.clear();
    sigCanvasOfficer.current?.clear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Capture signatures before validation
    const applicantSig = sigCanvasApplicant.current.isEmpty() 
      ? null 
      : sigCanvasApplicant.current.toDataURL('image/png');
    
    const officerSig = sigCanvasOfficer.current.isEmpty()
      ? null
      : sigCanvasOfficer.current.toDataURL('image/png');
    
    setFormData(prev => ({
      ...prev,
      applicantSignature: applicantSig,
      officerActingSignature: officerSig
    }));

    if (!validateForm()) {
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'applicantSignature' || key === 'officerActingSignature') {
            const blob = dataURLtoBlob(value);
            data.append(key, blob, `${key}.png`);
          } else {
            data.append(key, value);
          }
        }
      });

      await axios.post('http://localhost:8093/Member_LeaveApplicant/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Leave application submitted successfully!');
      handleFormReset();
      setIsSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting form');
    }
  };

  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    
    return new Blob([u8arr], { type: mime });
  }

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      
        <MainTitle />
      

      <NavBar />

      {logoutMessage && (
        <Alert variant="success" className="mb-0">
          {logoutMessage}
        </Alert>
      )}

      {/* Main Form */}
      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>Application For Leave</h2>
        
        {isSubmitted && (
          <Alert variant="success" className="mb-4">
            Form submitted successfully!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* First Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Designation</Form.Label>
                <Form.Select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  isInvalid={!!errors.designation}
                >
                  <option value="">Select...</option>
                  <option>Commissioned officers</option>
                  <option>Non Commissioned officers & enlisted personnel</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.designation}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Sub Designation</Form.Label>
                <Form.Select
                  name="subDesignation"
                  value={formData.subDesignation}
                  onChange={handleChange}
                  disabled={!formData.designation}
                  isInvalid={!!errors.subDesignation}
                >
                  <option value="">Choose sub designation</option>
                  {formData.designation &&
                    designationOptions[formData.designation]?.map((sub, index) => (
                      <option key={index} value={sub}>{sub}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.subDesignation}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Ministry / Department</Form.Label>
                <Form.Control
                  name="ministry"
                  value={formData.ministry}
                  onChange={handleChange}
                  isInvalid={!!errors.ministry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ministry}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Leave Days Applied (C, V, O)</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="C"
                      name="leaveDaysC"
                      value={formData.leaveDaysC}
                      onChange={handleChange}
                      isInvalid={!!errors.leaveDaysC}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="V"
                      name="leaveDaysV"
                      value={formData.leaveDaysV}
                      onChange={handleChange}
                      isInvalid={!!errors.leaveDaysV}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="O"
                      name="leaveDaysO"
                      value={formData.leaveDaysO}
                      onChange={handleChange}
                      isInvalid={!!errors.leaveDaysO}
                    />
                  </Col>
                </Row>
                <div className="d-flex">
                  {errors.leaveDaysC && <small className="text-danger">{errors.leaveDaysC}</small>}
                  {errors.leaveDaysV && <small className="text-danger ms-2">{errors.leaveDaysV}</small>}
                  {errors.leaveDaysO && <small className="text-danger ms-2">{errors.leaveDaysO}</small>}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Leave Taken This Year (C, V, O)</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="C"
                      name="leaveTakenC"
                      value={formData.leaveTakenC}
                      onChange={handleChange}
                      isInvalid={!!errors.leaveTakenC}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="V"
                      name="leaveTakenV"
                      value={formData.leaveTakenV}
                      onChange={handleChange}
                      isInvalid={!!errors.leaveTakenV}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="O"
                      name="leaveTakenO"
                      value={formData.leaveTakenO}
                      onChange={handleChange}
                      isInvalid={!!errors.leaveTakenO}
                    />
                  </Col>
                </Row>
                <div className="d-flex">
                  {errors.leaveTakenC && <small className="text-danger">{errors.leaveTakenC}</small>}
                  {errors.leaveTakenV && <small className="text-danger ms-2">{errors.leaveTakenV}</small>}
                  {errors.leaveTakenO && <small className="text-danger ms-2">{errors.leaveTakenO}</small>}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">First Appointment Date</Form.Label>
                <DatePicker
                  selected={parseDateString(formData.firstAppointmentDate)}
                  onChange={(date) => handleDateChange(date, 'firstAppointmentDate')}
                  className={`form-control ${errors.firstAppointmentDate ? 'is-invalid' : ''}`}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select date"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstAppointmentDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Second Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Commence Leave Date</Form.Label>
                <DatePicker
                  selected={parseDateString(formData.commenceLeaveDate)}
                  onChange={(date) => handleDateChange(date, 'commenceLeaveDate')}
                  className={`form-control ${errors.commenceLeaveDate ? 'is-invalid' : ''}`}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select date"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.commenceLeaveDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Resume Duties Date</Form.Label>
                <DatePicker
                  selected={parseDateString(formData.resumeDutiesDate)}
                  onChange={(date) => handleDateChange(date, 'resumeDutiesDate')}
                  className={`form-control ${errors.resumeDutiesDate ? 'is-invalid' : ''}`}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select date"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.resumeDutiesDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Reason for Leave</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="reasonForLeave"
                  value={formData.reasonForLeave}
                  onChange={handleChange}
                  isInvalid={!!errors.reasonForLeave}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reasonForLeave}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Applicant's Signature</Form.Label>
                <div className="border rounded p-2" style={{ background: '#f8f9fa' }}>
                  <SignatureCanvas
                    ref={sigCanvasApplicant}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: 'signature-canvas w-100'
                    }}
                  />
                </div>
                <div className="mt-2">
                  <Button variant="outline-secondary" size="sm" onClick={clearApplicantSignature}>
                    Clear Signature
                  </Button>
                </div>
                {errors.applicantSignature && (
                  <small className="text-danger">{errors.applicantSignature}</small>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Officer Acting During Leave</Form.Label>
                <Form.Control
                  name="officerActingName"
                  value={formData.officerActingName}
                  onChange={handleChange}
                  isInvalid={!!errors.officerActingName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officerActingName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Officer's Signature</Form.Label>
                <div className="border rounded p-2" style={{ background: '#f8f9fa' }}>
                  <SignatureCanvas
                    ref={sigCanvasOfficer}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: 'signature-canvas w-100'
                    }}
                  />
                </div>
                <div className="mt-2">
                  <Button variant="outline-secondary" size="sm" onClick={clearOfficerSignature}>
                    Clear Signature
                  </Button>
                </div>
                {errors.officerActingSignature && (
                  <small className="text-danger">{errors.officerActingSignature}</small>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-dark">Date</Form.Label>
                <DatePicker
                  selected={parseDateString(formData.date)}
                  onChange={(date) => handleDateChange(date, 'date')}
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select date"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button
              type="submit"
              style={{
                backgroundColor: '#053e34',
                borderColor: '#053e34',
                fontSize: '18px',
                padding: '10px 30px',
                width: '50%'
              }}
            >
              Apply for Leave
            </Button>
          </div>
        </Form>
      </div>

      <Footer />
    </div>
  );
}