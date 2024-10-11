// App.js
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Table, Form, Button, Modal, Image } from 'react-bootstrap';
import axios from 'axios';
import './ViewMembers.css';


function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredData = data.filter(item =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SMART-LEAVE</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1 className="text-center">Personnel Data</h1>

        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by full name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Full Name</th>
              <th>Designation</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Leave Remaining</th>
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
                    style={{ width: '100%', height: 'auto', maxWidth: '400px', maxHeight: '400px', borderRadius: '10%' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads/default.jpg'; }} // Fallback on error
                  />



                  </td>
                  <td>{item.fullName}</td>
                  <td>{item.designation}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td>{item.leaveRemaining}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleShowModal(item)}>View Details</Button>
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
      </Container>

      {selectedPerson && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPerson.fullName}'s Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Full Name:</strong> {selectedPerson.fullName}</p>
            <p><strong>Address:</strong> {`${selectedPerson.address.street}, ${selectedPerson.address.city}, ${selectedPerson.address.state}, ${selectedPerson.address.zipCode}`}</p>
            <p><strong>Gender:</strong> {selectedPerson.gender}</p>
            <p><strong>Birthday:</strong> {selectedPerson.birthday}</p>
            <p><strong>Age:</strong> {selectedPerson.age}</p>
            <p><strong>Email:</strong> {selectedPerson.email}</p>
            <p><strong>Mobile:</strong> {selectedPerson.mobile}</p>
            <p><strong>Telephone:</strong> {selectedPerson.telephone}</p>
            <p><strong>Designation:</strong> {selectedPerson.designation}</p>
            <p><strong>Role:</strong> {selectedPerson.role}</p>

            {/* Display uploaded documents */}
            <div>
              <p><strong>Documents:</strong></p>
              {selectedPerson.birthCertificate && (
                <p><a href={`/uploads/${selectedPerson.birthCertificate}`} download>Download Birth Certificate</a></p>
              )}
              {selectedPerson.otherDocument1 && (
                <p><a href={`/uploads/${selectedPerson.otherDocument1}`} download>Download Document 1</a></p>
              )}
              {selectedPerson.otherDocument2 && (
                <p><a href={`/uploads/${selectedPerson.otherDocument2}`} download>Download Document 2</a></p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default App;
