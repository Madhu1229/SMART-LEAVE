import React, { useState } from 'react';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';

const NewMember = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    address: { street: '', city: '', state: '', zipCode: '' },
    gender: '',
    birthday: '',
    age: '',
    email: '',
    mobile: '',
    telephone: '',
    maritalStatus: '',
    educationLevel: '',
    memberID:'',
    designation: '',
    subDesignation: '',
    ministry: '',
    joiningDate: '',
    leaveTaken: '',
    leaveRemaining: '',
    role: '',
    birthCertificate: null,
    otherDocument1: null,
    otherDocument2: null,
  });
  
  const [errors, setErrors] = useState({});  // Track errors for fields
  const [isSubmitted, setIsSubmitted] = useState(false); // Check if form is submitted
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  // Function to calculate age from birthday
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleBirthdayChange = (e) => {
    const birthday = e.target.value;
    const age = calculateAge(birthday);
    setFormData({ ...formData, birthday, age });
  };

  // Validation function for checking empty fields
  const validateFields = () => {
    let validationErrors = {};
    
    if (!formData.photo) validationErrors.photo = "Please fill this field.";
    if (!formData.fullName) validationErrors.fullName = "Please fill this field.";
    if (!formData.address.street) validationErrors.street = "Please fill this field.";
    if (!formData.address.city) validationErrors.city = "Please fill this field.";
    if (!formData.address.state) validationErrors.state = "Please fill this field.";
    if (!formData.address.zipCode) validationErrors.zipCode = "Please fill this field.";
    if (!formData.gender) validationErrors.gender = "Please fill this field.";
    if (!formData.birthday) validationErrors.birthday = "Please fill this field.";
    if (!formData.email) validationErrors.email = "Please fill this field.";
    if (!formData.mobile) validationErrors.mobile = "Please fill this field.";
    if (!formData.memberID) validationErrors.memberID = "Please fill this field.";
    if (!formData.designation) validationErrors.designation = "Please fill this field.";
    if (!formData.subDesignation) validationErrors.subDesignation = "Please fill this field.";
    if (!formData.maritalStatus) validationErrors.maritalStatus = "Please fill this field.";
    if (!formData.educationLevel) validationErrors.educationLevel = "Please fill this field.";
    if (!formData.ministry) validationErrors.ministry = "Please fill this field.";
    if (!formData.joiningDate) validationErrors.joiningDate = "Please fill this field.";
    if (!formData.leaveTaken) validationErrors.leaveTaken = "Please fill this field.";
    if (!formData.leaveRemaining) validationErrors.leaveRemaining = "Please fill this field.";
    if (!formData.role) validationErrors.role = "Please fill this field.";
    




    // More validations for other fields can be added here
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If no errors, submit the form
      console.log("Form Submitted:", formData);
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);  // If there are errors, mark as not submitted
    }
  };

  // Function to display validation error messages
  const renderErrorMessage = (field) => {
    return errors[field] ? (
      <div className="text-danger">{errors[field]}</div>
    ) : null;
  };

  // Rendering steps based on `step` state
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3>Step 1: Personal Details</h3>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td><label>Upload Photo</label></td>
                  <td>
                    <input
                      type="file"
                      name="photo"
                      value={formData.photo} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                    />
                    {renderErrorMessage('photo')}
                  </td>
                </tr>

                <tr>
                  <td><label>Full Name</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('fullName')}
                  </td>
                </tr>
                <tr>
                  <td><label>Address</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="street" 
                      placeholder="Street" 
                      value={formData.address.street} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.street ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('street')}
                    <input 
                      type="text" 
                      name="city" 
                      placeholder="City" 
                      value={formData.address.city} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('city')}


                    <input 
                      type="text" 
                      name="state" 
                      placeholder="state" 
                      value={formData.address.state} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.state ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('state')}

                    <input 
                      type="text" 
                      name="zipCode" 
                      placeholder="zipCode" 
                      value={formData.address.zipCode} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('zipCode')}

                  </td>
                </tr>
                <tr>
                  <td><label>Gender</label></td>
                  <td>
                    <Form.Control 
                      as="select" 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleInputChange}
                      className={`${errors.gender ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
                    {renderErrorMessage('gender')}
                  </td>
                </tr>
                <tr>
                  <td><label>Birthday</label></td>
                  <td>
                    <input 
                      type="date" 
                      name="birthday" 
                      value={formData.birthday}
                      onChange={handleBirthdayChange} 
                      className={`form-control ${errors.birthday ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('birthday')}
                  </td>
                </tr>
                <tr>
                  <td><label>Age</label></td>
                  <td><input type="number" value={formData.age} readOnly className="form-control" /></td>
                </tr>
                <tr>
                  <td><label>Email Address</label></td>
                  <td>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      className={`form-control${errors.email ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('email')}
                  </td>
                </tr>
                <tr>
                  <td><label>Mobile</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="mobile" 
                      value={formData.mobile} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('mobile')}
                  </td>
                </tr>
                <tr>
                  <td><label>Telephone</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="telephone" 
                      value={formData.telephone} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.telephone ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('telephone')}
                  </td>
                </tr>
                <tr>
                  <td><label>Marital Status</label></td>
                  <td>
                    <Form.Control 
                      as="select" 
                      name="maritalStatus" 
                      value={formData.maritalStatus} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.maritalStatus ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                    </Form.Control>
                    {renderErrorMessage('maritalStatus')}
                  </td>
                </tr>
                <tr>
                  <td><label>Educational Level</label></td>
                  <td>
                    <Form.Control 
                      as="select" 
                      name="educationLevel" 
                      value={formData.educationLevel} 
                      onChange={handleInputChange}
                      className={`form-control${errors.educationLevel ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Educational Level</option>
                      <option value="G.C.E. O/L">G.C.E. O/L</option>
                      <option value="G.C.E. A/L">G.C.E. A/L</option>
                      <option value="Graduated">Graduated</option>
                    </Form.Control>
                    {renderErrorMessage('educationLevel')}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="primary" onClick={nextStep}>Next</Button>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Step 2: Member Details</h3>
            <Table striped bordered hover>
              <tbody>

              <tr>
                  <td><label>Member ID</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="memberID" 
                      value={formData.memberID} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.memberID ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('memberID')}
                  </td>
                </tr>

              <tr>
                  <td><label>Designation</label></td>
                  <td>
                    <Form.Control 
                      as="select" 
                      name="designation" 
                      value={formData.designation} 
                      onChange={handleInputChange}
                      className={`form-control${errors.designation ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Designation</option>
                      <option value="commisioned">Commisioned Officers</option>
                      <option value="non-commisioned">Non-Commisioned Officers & Enlisted Personnel</option>
                    </Form.Control>
                    {renderErrorMessage('designation')}
                  </td>
                </tr>
                {formData.designation === "commisioned" && (
                  <tr>
                    <td><label>Sub Designation</label></td>
                    <td>
                      <Form.Control 
                        as="select" 
                        name="subDesignation" 
                        value={formData.subDesignation} 
                        onChange={handleInputChange}
                        className={`form-control${errors.subDesignation ? 'is-invalid' : ''}`}
                      >
                        <option value="">Select Sub Designation</option>
                        <option value="general">General / Flag Officers</option>
                        <option value="senior">Senior Officers</option>
                        <option value="junior">Junior Officers</option>
                        <option value="snrNCO">Senior NCOs</option>
                        <option value="jnrNCO">Junior NCOs</option>
                        <option value="enlisted">Enlisted</option>
                      </Form.Control>
                      {renderErrorMessage('subDesignation')}
                    </td>
                  </tr>
                )}
                {formData.designation === "non-commisioned" && (
                  <tr>
                    <td><label>Sub Designation</label></td>
                    <td>
                      <Form.Control 
                        as="select" 
                        name="subDesignation" 
                        value={formData.subDesignation} 
                        onChange={handleInputChange}
                        className={`form-control${errors.subDesignation ? 'is-invalid' : ''}`}
                      >
                        <option value="">Select Sub Designation</option>
                        <option value="warrantI">Warrant Officer Class I</option>
                        <option value="warrantII">Warrant Officer Class II</option>
                        <option value="staffSergeant">Staff Sergeant</option>
                        <option value="sergeant">Sergeant</option>
                        <option value="corporal">Corporal / Bombardier</option>
                        <option value="lanceCorporal">Lance Corporal / Lance Bombardier</option>
                        <option value="private">Private</option>
                      </Form.Control>
                      {renderErrorMessage('subDesignation')}
                    </td>
                  </tr>
               
                )}
                
                       

                <tr>
                  <td><label>Ministry</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="ministry" 
                      value={formData.ministry} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.ministry ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('ministry')}
                  </td>
                </tr>
                <tr>
                  <td><label>Joining Date</label></td>
                  <td>
                    <input 
                      type="date" 
                      name="joiningDate" 
                      value={formData.joiningDate}
                      onChange={handleInputChange} 
                      className={`form-control ${errors.joiningDate ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('joiningDate')}
                  </td>
                </tr>
                <tr>
                  <td><label>Leave Taken</label></td>
                  <td>
                    <input 
                      type="number" 
                      name="leaveTaken" 
                      value={formData.leaveTaken} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.leaveTaken ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('leaveTaken')}
                  </td>
                </tr>
                <tr>
                  <td><label>Leave Remaining</label></td>
                  <td>
                    <input 
                      type="number" 
                      name="leaveRemaining" 
                      value={formData.leaveRemaining} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.leaveRemaining ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('leaveRemaining')}
                  </td>
                </tr>
                <tr>
                  <td><label>Role</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="role" 
                      value={formData.role} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.role ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('role')}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="secondary" onClick={prevStep}>Previous</Button>
            <Button variant="primary" onClick={nextStep}>Next</Button>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Step 3: Document Upload</h3>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td><label>Birth Certificate</label></td>
                  <td>
                    <input 
                      type="file" 
                      name="birthCertificate" 
                      onChange={handleFileChange}
                      accept="application/pdf,image/*"
                      className={`form-control ${errors.birthCertificate ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('birthCertificate')}
                  </td>
                </tr>
                <tr>
                  <td><label>Other Document 1</label></td>
                  <td>
                    <input 
                      type="file" 
                      name="otherDocument1" 
                      onChange={handleFileChange}
                      accept="application/pdf,image/*"
                      className={`form-control ${errors.otherDocument1 ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('otherDocument1')}
                  </td>
                </tr>
                <tr>
                  <td><label>Other Document 2</label></td>
                  <td>
                    <input 
                      type="file" 
                      name="otherDocument2" 
                      onChange={handleFileChange}
                      accept="application/pdf,image/*"
                      className={`form-control ${errors.otherDocument2 ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('otherDocument2')}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button variant="secondary" onClick={prevStep}>Previous</Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {renderStep()}
      {isSubmitted && <div className="text-success">Form Submitted Successfully!</div>}
    </Form>
  );
};

export default NewMember;
