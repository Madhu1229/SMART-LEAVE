import React, { useState, useEffect } from 'react';
import { Container, Navbar, Table, Form, Button, Modal, Image, Alert } from 'react-bootstrap';
import axios from 'axios';
import './ViewMembers.css';
import AdminNavBar from '../Pages/AdminNavBar';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


import './LoginIcon.css';


function App() {

   const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message
              const navigate = useNavigate(); // Create navigate function
            
              function logout() {
                localStorage.removeItem('token');
                setLogoutMessage('You have been logged out successfully.'); // Set the logout message
                setTimeout(() => {
                  window.location.href = '/'; // Redirect to the login page after 3 seconds
                }, 3000); // Delay the redirect for 3 seconds to show the message
              }


  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editedPerson, setEditedPerson] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  useEffect(() => {
    // Fetch all data from the database
    axios.get('http://localhost:8093/Member') // Replace with your API endpoint
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const handleShowModal = (person) => {
    setSelectedPerson(person);
    setShowModal(true);
  };

  const handleShowEditModal = (person) => {
    setEditedPerson(person);
    setShowEditModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);


   // Move the calculateAge function above the handleEditChange function
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    // Check if the name belongs to the address object
    if (name === "street" || name === "city" || name === "state" || name === "zipCode") {
        setEditedPerson((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value, // Dynamically set the value based on the name
            },
        }));
    } 
    
    else if (name === "birthday") {
      const age = calculateAge(value);
      setEditedPerson(prev => ({
        ...prev,
        birthday: value, // Store the birthday directly
        age: age, // Set the calculated age
      }));
    } 
    
    else {
        // For other fields not related to address
        setEditedPerson((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
};




const handleSaveEdit = () => {
  // Log the edited person data for debugging
  console.log("Sending updated details for:", editedPerson.memberID);

  // Send updated details to the backend to save changes
  axios.put(`http://localhost:8093/Member/update/${editedPerson.memberID}`, editedPerson)
      .then(response => {
          // Log the server response for debugging
          console.log("Response from server:", response.data);

          // Update the local data after editing
          const updatedData = data.map(person =>
              person.memberID === editedPerson.memberID ? { ...person, ...editedPerson } : person
          );

          setData(updatedData);
          setShowEditModal(false);

          // Show success message
          setSuccessMessage('Changes saved successfully!');

          // Hide success message after 3 seconds
          setTimeout(() => {
              setSuccessMessage('');
          }, 3000);
      })
      .catch(error => {
          // Enhanced error handling
          // console.error('Error updating data:', error.response?.data || error.message);
          alert('Failed to save changes: ' + (error.response?.data?.error || error.message));
      });
};



// Function to delete a member
const deleteMember = (memberID) => {
  console.log('Deleting member with ID:', memberID);  // Debugging: Check if memberID is defined

  if (window.confirm("Are you sure you want to delete this member?")) {
      axios.delete(`http://localhost:8093/Member/delete/${memberID}`)
          .then(response => {
              console.log(response.data); // Log success response
              setData(data.filter(person => person.memberID !== memberID));
              alert('Member deleted successfully!');
          })
          .catch(error => {
              alert('Failed to delete member: ' + (error.response?.data?.error || error.message));
          });
  }
};


  const filteredData = data.filter(item =>
    (item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (item.serviceNo && item.serviceNo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                    <AdminNavBar/>     
            
              {/* Log out message............... */}
              {logoutMessage && (
                    <div className="alert alert-success" role="alert">
                        {logoutMessage}
                    </div>
                    )}

    
    <>
    

      <div className="container-fluid mt-4">
        <h1 className="text-center">Data Base</h1>

        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by Full Name or Service No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>


        {/* Display Success Message */}
        {successMessage && (
          <Alert variant="success">
            {successMessage}
          </Alert>
        )}
        
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Photo</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Army ID No</th>
              <th>Service No</th>
              <th>Sub Rank</th>
              <th>Leave Taken</th>
              <th>Leave Remaining</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                  <Image
                    src={item.photo ? `http://localhost:8093/uploads/${item.photo}` : 'http://localhost:8093/uploads/default.jpg'}
                    alt="Person"
                    style={{ width: '100%', height: 'auto', maxWidth: '100px', maxHeight: '100px', borderRadius: '15%' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads/default.jpg'; }} // Fallback on error
                  />

                  </td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.memberID}</td>
                  <td>{item.serviceNo}</td>
                  <td>{item.subDesignation}</td>
                  <td>{item.leaveTaken}</td>
                  <td>{item.leaveRemaining}</td>
                  <td>{item.role}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleShowModal(item)}>View Details</Button>{' '}
                    <Button variant="warning" onClick={() => handleShowEditModal(item)}>Edit Details</Button>
                    <Button variant="danger" onClick={() => deleteMember(item.memberID)}>Delete</Button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No data found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {selectedPerson && (
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPerson.fullName}'s Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <tbody>
            <tr>
                
              <td colSpan={2} style={{ textAlign: 'center' }}>
                <Image
                  src={selectedPerson.photo ? `http://localhost:8093/uploads/${selectedPerson.photo}` : 'http://localhost:8093/uploads/default.jpg'}
                  alt="Person"
                  style={{ width: '100%', height: 'auto', maxWidth: '200px', maxHeight: '400px', borderRadius: '10%' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads/default.jpg'; }} // Fallback on error
                />
              </td>
              </tr>
              <tr>
                <td><strong>Full Name</strong></td>
                <td>{selectedPerson.fullName}</td>
              </tr>
              <tr>
                <td><strong>Address</strong></td>
                <td>{`${selectedPerson.address.street}, ${selectedPerson.address.city}, ${selectedPerson.address.state}, ${selectedPerson.address.zipCode}`}</td>
              </tr>
              <tr>
                <td><strong>Gender</strong></td>
                <td>{selectedPerson.gender}</td>
              </tr>
              <tr>
                <td><strong>Birthday</strong></td>
                <td>{selectedPerson.birthday}</td>
              </tr>
              <tr>
                <td><strong>Age</strong></td>
                <td>{selectedPerson.age}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{selectedPerson.email}</td>
              </tr>
              <tr>
                <td><strong>Mobile</strong></td>
                <td>{selectedPerson.mobile}</td>
              </tr>

              <tr>
                <td><strong>Telephone</strong></td>
                <td>{selectedPerson.telephone}</td>
              </tr>
              <tr>
                <td><strong>maritalStatus</strong></td>
                <td>{selectedPerson.maritalStatus}</td>
              </tr>
              <tr>
                <td><strong>educationLevel</strong></td>
                <td>{selectedPerson.educationLevel}</td>
              </tr>
              <tr>
                <td><strong>memberID</strong></td>
                <td>{selectedPerson.memberID}</td>
              </tr>
              <tr>
                <td><strong>serviceNo</strong></td>
                <td>{selectedPerson.serviceNo}</td>
              </tr>
              <tr>
                <td><strong>nic</strong></td>
                <td>{selectedPerson.nic}</td>
              </tr>
              <tr>
                <td><strong>bloodGroup</strong></td>
                <td>{selectedPerson.bloodGroup}</td>
              </tr>
              <tr>
                <td><strong>Designation</strong></td>
                <td>{selectedPerson.designation}</td>
              </tr>
          
              <tr>
                <td><strong>subDesignation</strong></td>
                <td>{selectedPerson.subDesignation}</td>
              </tr>
              <tr>
                <td><strong>ministry</strong></td>
                <td>{selectedPerson.ministry}</td>
              </tr>
              <tr>
                <td><strong>joiningDate</strong></td>
                <td>{selectedPerson.joiningDate}</td>
              </tr>
              
              <tr>
                <td><strong>Leave Taken</strong></td>
                <td>{selectedPerson.leaveTaken}</td>
              </tr>
              <tr>
                <td><strong>Leave Remaining</strong></td>
                <td>{selectedPerson.leaveRemaining}</td>
              </tr>

              <tr>
                <td><strong>Role</strong></td>
                <td>{selectedPerson.role}</td>
              </tr>

            </tbody>
          </Table>
      
          {/* Display uploaded documents */}
          <div>
            <p><strong>Documents:</strong></p>
            {selectedPerson.birthCertificate && (
              <p>
                <a href={`http://localhost:8093/uploads/${selectedPerson.birthCertificate}`} target="_blank" rel="noopener noreferrer">
                  View Birth Certificate
                </a>{' '}
                |{' '}
                <a href={`http://localhost:8093/uploads/${selectedPerson.birthCertificate}`} download>
                  Download Birth Certificate
                </a>
              </p>
            )}
            {selectedPerson.otherDocument1 && (
              <p>
                <a href={`http://localhost:8093/uploads/${selectedPerson.otherDocument1}`} target="_blank" rel="noopener noreferrer">
                  View Document 1
                </a>{' '}
                |{' '}
                <a href={`http://localhost:8093/uploads/${selectedPerson.otherDocument1}`} download>
                  Download Document 1
                </a>
              </p>
            )}
            {selectedPerson.otherDocument2 && (
              <p>
                <a href={`http://localhost:8093/uploads/${selectedPerson.otherDocument2}`} target="_blank" rel="noopener noreferrer">
                  View Document 2
                </a>{' '}
                |{' '}
                <a href={`http://localhost:8093/uploads/${selectedPerson.otherDocument2}`} download>
                  Download Document 2
                </a>
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      
  )}





  {/* Edit Details Modal */}
  {editedPerson && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {editedPerson.fullName}'s Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>

           
          
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={editedPerson.fullName}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                  <Form.Label>Address</Form.Label>
                  
                  <br/>
                  
                  <Form.Label>Street</Form.Label>
                  
                    <Form.Control
                      type="text" 
                      name="street" 
                      value={editedPerson.address.street} 
                      onChange={handleEditChange}
                      
                    />
                    
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text" 
                      name="city"  
                      value={editedPerson.address.city} 
                      onChange={handleEditChange}
                      
                    />
                    

                    <Form.Label>State</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="state" 
                      value={editedPerson.address.state} 
                      onChange={handleEditChange}
                       
                    />
                  
                  <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text" 
                      name="zipCode" 
                      value={editedPerson.address.zipCode} 
                      onChange={handleEditChange}
                       
                    />
                   

                 
                  </Form.Group>

                <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control 
                      as="select" 
                      name="gender" 
                      value={editedPerson.gender} 
                      onChange={handleEditChange}
                      
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date" 
                  name="birthday" 
                  value={editedPerson.birthday}
                  onChange={handleEditChange}
                />
              </Form.Group>


              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={editedPerson.age} readOnly
                 
                />
              </Form.Group>


              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editedPerson.email}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text" 
                  name="mobile" 
                  value={editedPerson.mobile}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="text" 
                  name="telephone" 
                  value={editedPerson.telephone}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Marital Status</Form.Label>
                <Form.Control
                   as="select" 
                   name="maritalStatus" 
                  value={editedPerson.maritalStatus}
                  onChange={handleEditChange}
                >
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
              </Form.Control>
              </Form.Group>


              <Form.Group>
                <Form.Label>Educational Level</Form.Label>
                <Form.Control
                   as="select" 
                   name="educationLevel" 
                  value={editedPerson.educationLevel}
                  onChange={handleEditChange}
                >
                       <option value="">Select Educational Level</option>
                      <option value="G.C.E. O/L">G.C.E. O/L</option>
                      <option value="G.C.E. A/L">G.C.E. A/L</option>
                      <option value="Graduated">Graduated</option>
              </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Army ID No</Form.Label>
                <Form.Control
                  type="text"
                  name="memberID"
                  value={editedPerson.memberID}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Service No</Form.Label>
                <Form.Control
                  type="text"
                  name="serviceNo"
                  value={editedPerson.serviceNo}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>NIC No</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={editedPerson.nic}
                  onChange={handleEditChange}
                />
              </Form.Group>





              <Form.Group>
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  as="select" 
                  name="bloodGroup" 
                  value={editedPerson.bloodGroup}
                  onChange={handleEditChange}
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
              </Form.Group>

              
            <Form.Group>
            <Form.Label>Rank</Form.Label>
            <Form.Control
              as="select"
              name="designation"
              value={editedPerson.designation} // Ensure this value is controlled
              onChange={handleEditChange}
            >
              <option value="">Select Rank</option>
              <option value="commissioned">Commissioned Officers</option>
              <option value="non-commissioned">Non-Commissioned Officers & Enlisted Personnel</option>
            </Form.Control>
          </Form.Group>


          {/* Conditional rendering for Sub Rank based on designation */}
          {editedPerson.designation === "commissioned" && (
            <Form.Group>
              <Form.Label>Sub Rank</Form.Label>
              <Form.Control
                as="select"
                name="subDesignation" // Correctly handle subDesignation
                value={editedPerson.subDesignation} // Ensure this value is controlled
                onChange={handleEditChange}
              >
                      <option value="">Select Sub Designation</option>
                        <option value="general">General / Flag Officers</option>
                        <option value="senior">Senior Officers</option>
                        <option value="junior">Junior Officers</option>
                        <option value="snrNCO">Senior NCOs</option>
                        <option value="jnrNCO">Junior NCOs</option>
                        <option value="enlisted">Enlisted</option>
              </Form.Control>
            </Form.Group>
          )}

          {editedPerson.designation === "non-commissioned" && (
            <Form.Group>
              <Form.Label>Sub Rank</Form.Label>
              <Form.Control
                as="select"
                name="subDesignation" // Correctly handle subDesignation
                value={editedPerson.subDesignation} // Ensure this value is controlled
                onChange={handleEditChange}
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
            </Form.Group>
          )}

                <Form.Group>
                <Form.Label>Ministry</Form.Label>
                <Form.Control
                  type="text"
                  name="ministry"
                  value={editedPerson.ministry}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  type="date"
                  name="joiningDate"
                  value={editedPerson.joiningDate}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Leave Taken</Form.Label>
                <Form.Control
                  type="number"
                  name="leaveTaken"
                  value={editedPerson.leaveTaken}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Leave Remaining</Form.Label>
                <Form.Control
                  type="number"
                  name="leaveRemaining"
                  value={editedPerson.leaveRemaining}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select" 
                  name="role" 
                  value={editedPerson.role}
                  onChange={handleEditChange}
                >

                      <option value="">Select Role</option>
                      <option value="admin1">Admin I</option>
                      <option value="admin2">Admin II</option>
                      <option value="admin3">Admin III</option>
                      <option value="leaveApplicant">Leave Applicant</option>
          

              </Form.Control>
              </Form.Group>
 
              {/* Add other fields as necessary for editing */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
            <Button variant="success" onClick={handleSaveEdit}>Save Changes</Button>
            
          </Modal.Footer>
        </Modal>
      )}









    </>
    {/*.......................................................For Footer................................................ */}
    
     <Footer/>
    
    </div>
  );
}

export default App;
