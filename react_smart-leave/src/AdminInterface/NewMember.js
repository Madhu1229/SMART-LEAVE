import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios'

const NewMember = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    photo: null,
    fullName: '',
    address: { street:'' , city: '', state: '', zipCode: '' },
    gender: '',
    birthday: '',
    age: '',
    email: '',
    mobile: '',
    telephone: '',
    maritalStatus: '',
    educationLevel: '',
    memberID: '',
    serviceNo:'',
    nic:'',
    bloodGroup:'',
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
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateFields()) {
      // Create FormData instance to handle file uploads
      const data = new FormData();
  
      // Append non-file fields to the form data
      data.append('fullName', formData.fullName);
      data.append('street', formData.address.street);
      data.append('city',  formData.address.city);
      data.append('state', formData.address.state);
      data.append('zipCode', formData.address.zipCode);
      data.append('gender', formData.gender);
      data.append('birthday', formData.birthday);
      data.append('age', formData.age);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      data.append('telephone', formData.telephone);
      data.append('maritalStatus', formData.maritalStatus);
      data.append('educationLevel', formData.educationLevel);
      data.append('memberID', formData.memberID);
      data.append('serviceNo', formData.serviceNo);
      data.append('nic', formData.nic);
      data.append('bloodGroup', formData.bloodGroup);
      data.append('designation', formData.designation);
      data.append('subDesignation', formData.subDesignation);
      data.append('ministry', formData.ministry);
      data.append('joiningDate', formData.joiningDate);
      data.append('leaveTaken', formData.leaveTaken);
      data.append('leaveRemaining', formData.leaveRemaining);
      data.append('role', formData.role);
      
  
      // Append file fields to the form data (ensure files are selected)
      if (formData.photo) data.append('photo', formData.photo);
      if (formData.birthCertificate) data.append('birthCertificate', formData.birthCertificate);
      if (formData.otherDocument1) data.append('otherDocument1', formData.otherDocument1);
      if (formData.otherDocument2) data.append('otherDocument2', formData.otherDocument2);
  
      // Proceed to submit the form data
      axios.post('http://localhost:8093/Member/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the proper content type
        }
      })
      .then(() => {
        alert('Member Added');
        handleFormReset(); // Reset form after successful submission
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
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState(''); // Add this line

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear error for the specific field if it's now filled
    setErrors({
      ...errors,
      [name]: value ? '' : errors[name],
    });

    if (name === 'street' || name === 'city' || name === 'state' || name === 'zipCode') {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  useEffect(() => {
    // Reset selectedFile on component mount
    setSelectedFile('');
}, []);

  const handleFileChange = (e) => {
    const { name } = e.target; // Extract name from the input
    const file = e.target.files[0];
    
  
  
// Update the formData for the specific file input
setFormData((prevData) => ({
  ...prevData,
  [name]: file,
}));

   
  
// Clear errors (if any) for the current input field
setErrors((prevErrors) => ({
  ...prevErrors,
  [name]: file ? '' : prevErrors[name],
}));
  };
  

  const handleFormReset = () => {
    // Reset form data and selected file
    setFormData({
        photo: '',
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
        memberID: '',
        serviceNo:'',
        nic:'',
        bloodGroup:'',
        designation: '',
        subDesignation: '',
        ministry: '',
        joiningDate: '',
        leaveTaken: '',
        leaveRemaining: '',
        role: '',
        birthCertificate: '',
        otherDocument1: '',
        otherDocument2: '',

    });
    setSelectedFile('');
    setErrors({});
};

  
  
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

    // Clear birthday error
    setErrors({
      ...errors,
      birthday: birthday ? '' : errors.birthday,
    });
  };

  const validateFields = () => {
    let validationErrors = {};

    if (!formData.photo) validationErrors.photo = "Please upload a photo.";
    if (!formData.fullName) validationErrors.fullName = "Please enter your full name.";
    
    // Check if address exists before accessing its properties
    if (!formData.address) {
        validationErrors.address = "Address information is required.";
    } else {
        if (!formData.address.street) validationErrors.street = "Please enter the street address.";
        if (!formData.address.city) validationErrors.city = "Please enter the city.";
        if (!formData.address.state) validationErrors.state = "Please enter the state.";
        if (!formData.address.zipCode) validationErrors.zipCode = "Please enter the zip code.";
    }
    
    if (!formData.gender) validationErrors.gender = "Please select a gender.";
    if (!formData.birthday) validationErrors.birthday = "Please select your birthday.";
    if (!formData.email) validationErrors.email = "Please enter your email address.";
    if (!formData.mobile) validationErrors.mobile = "Please enter your mobile number.";
    if (!formData.memberID) validationErrors.memberID = "Please enter the member ID.";
    if (!formData.serviceNo) validationErrors.serviceNo = "Please enter the service No.";
    if (!formData.nic) validationErrors.nic = "Please enter the NIC No.";
    if (!formData.designation) validationErrors.designation = "Please enter the designation.";
    if (!formData.subDesignation) validationErrors.subDesignation = "Please enter the sub-designation.";
    if (!formData.maritalStatus) validationErrors.maritalStatus = "Please select your marital status.";
    if (!formData.educationLevel) validationErrors.educationLevel = "Please select the education level.";
    if (!formData.ministry) validationErrors.ministry = "Please enter the ministry.";
    if (!formData.joiningDate) validationErrors.joiningDate = "Please enter the joining date.";
    if (!formData.leaveTaken) validationErrors.leaveTaken = "Please enter the number of leaves taken.";
    if (!formData.leaveRemaining) validationErrors.leaveRemaining = "Please enter the remaining leaves.";
    if (!formData.role) validationErrors.role = "Please enter the role.";
    if (!formData.birthCertificate) validationErrors.birthCertificate = "Please upload the birth certificate.";
    if (!formData.otherDocument1) validationErrors.otherDocument1 = "Please upload document 1.";
    if (!formData.otherDocument2) validationErrors.otherDocument2 = "Please upload document 2.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;  // Returns true if there are no errors
};


 

  // Handle next button click
  const handleNext = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  // Handle previous button click
  const handlePrevious = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const renderErrorMessage = (field) => {
    return errors[field] ? <div className="text-danger">{errors[field]}</div> : '';
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
                  <td><label>Officer's Photo</label></td>
                  <td>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="application/pdf,image/*"
                      className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                    required/>
                    {formData.photo && <p>Photo Selected: {formData.photo.name}</p>}
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
            {step < 2 && <button onClick={handleNext}>Next</button>}
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Step 2: Official Details</h3>
            <Table striped bordered hover>
              <tbody>

              <tr>
                  <td><label>Army ID No</label></td>
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
                  <td><label>Service No</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="serviceNo" 
                      value={formData.serviceNo} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.serviceNo ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('serviceNo')}
                  </td>
                </tr>


                <tr>
                  <td><label>NIC No</label></td>
                  <td>
                    <input 
                      type="text" 
                      name="nic" 
                      value={formData.nic} 
                      onChange={handleInputChange}
                      className={`form-control ${errors.nic ? 'is-invalid' : ''}`} 
                    />
                    {renderErrorMessage('nic')}
                  </td>
                </tr>



                <tr>
                  <td><label>Blood Group</label></td>
                  <td>
                    <Form.Control 
                      as="select" 
                      name="bloodGroup" 
                      value={formData.bloodGroup} 
                      onChange={handleInputChange}
                      className={`form-control${errors.bloodGroup ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="ARh+">A Rh+</option>
                      <option value="BRh+">B Rh+</option>
                      <option value="ABRh+">AB Rh+</option>
                      <option value="ORh+">O Rh+</option>
                      <option value="ARh-">A Rh-</option>
                      <option value="BRh-">B Rh-</option>
                      <option value="ABRh-">AB Rh-</option>
                      <option value="ORh-">O Rh-</option>
                      
                    </Form.Control>
                    {renderErrorMessage('bloodGroup')}
                  </td>
                </tr>

               
             


              <tr>
                  <td><label>Rank</label></td>
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
                    <td><label>Sub Rank</label></td>
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
                    <td><label>Sub Rank</label></td>
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
                    <Form.Control 
                      as="select" 
                      name="role" 
                      value={formData.role} 
                      onChange={handleInputChange}
                      className={`form-control${errors.role ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Role</option>
                      <option value="admin1">Admin I</option>
                      <option value="admin2">Admin II</option>
                      <option value="leaveApplicant">Leave Applicant</option>
          
                    </Form.Control>
                    {renderErrorMessage('role')}
                  </td>
                </tr>

              </tbody>
            </Table>
            
            {step > 1 && <button onClick={handlePrevious}>Previous</button>}
            {step < 3 && <button onClick={handleNext}>Next</button>}
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
                    required/>
                     {formData.birthCertificate && <p>Birth Certificate Selected: {formData.birthCertificate.name}</p>}
                    {renderErrorMessage('birthCertificate')}
                  </td>
                </tr>
                <tr>
                  <td><label>National ID</label></td>
                  <td>
                    <input 
                      type="file" 
                      name="otherDocument1" 
                      onChange={handleFileChange}
                      accept="application/pdf,image/*"
                      className={`form-control ${errors.otherDocument1 ? 'is-invalid' : ''}`} 
                    required/>
                     {formData.otherDocument1 && <p>National ID Selected: {formData.otherDocument1.name}</p>}
                    {renderErrorMessage('otherDocument1')}
                  </td>
                </tr>
                <tr>
                  <td><label>Army ID</label></td>
                  <td>
                    <input 
                      type="file" 
                      name="otherDocument2" 
                      onChange={handleFileChange}
                      accept="application/pdf,image/*"
                      className={`form-control ${errors.otherDocument2 ? 'is-invalid' : ''}`} 
                    required/>
                    {formData.otherDocument2 && <p>Other Document 2 Selected: {formData.otherDocument2.name}</p>}
                    {renderErrorMessage('otherDocument2')}
                  </td>
                </tr>
              </tbody>
            </Table>

            
            {step > 1 && <button onClick={handlePrevious}>Previous</button>}
            
            {step === 3 && <button onClick={handleSubmit}>Submit</button>}
            <button type="reset" onClick={handleFormReset}>Reset</button>
          </div>
        );
      default:
        return '';
    }
  };

  return (

    <div className="container" action="/Member/add" method="POST" enctype="multipart/form-data">
    <Form onSubmit={handleSubmit}>
      {renderStep()}
      {isSubmitted && <div className="text-success">Form Submitted Successfully!</div>}
    </Form>
    </div>
  );






};

export default NewMember;
