import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal,Image, Spinner } from "react-bootstrap";



function LeaveApplicationsByDate() {
    const [date, setDate] = useState("");
    const [leaveStatus, setLeaveStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showActionModal1, setShowActionModal1] = useState(false);
    const [showActionModal2, setShowActionModal2] = useState(false);
    const [showActionModal3, setShowActionModal3] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [actionStep, setActionStep] = useState(null); // Tracks which action is being performed

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:8093/Members/getAll`);
                setApplications(response.data.members);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };
        fetchApplications();
    }, []);

    const handleDateChange = (e) => setDate(e.target.value);
    const handleStatusChange = (e) => setLeaveStatus(e.target.value);
    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const fetchApplicationsByDate = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/getByDate`, { params: { date } });
            setApplications(response.data.applications);
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    const handleCloseApplication = (applicationId) => {
        alert(`Application with ID: ${applicationId} has been successfully closed.`);
        // Add API call logic here to close the application if necessary
    };

    const handleTakeAction = (application, action) => {
        setSelectedApplication(application);
        setActionStep(action); // Set the current action (Action 1, Action 2, or Action 3)
        
        // Show the correct modal based on action
        if (action === 1) {
            setShowActionModal1(true);
        } else if (action === 2) {
            setShowActionModal2(true);
        } else if (action === 3) {
            setShowActionModal3(true);
        }
    };



    // ..................
    

    return (
        <div className="container mt-5">
            <h2 className="mb-4">View Leave Applications by Date</h2>
            <Form.Group controlId="date">
                <Form.Label>Select Date:</Form.Label>
                <Form.Control type="date" value={date} onChange={handleDateChange} />
            </Form.Group>

            <Form.Group controlId="leaveStatus" className="mt-3">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" value={leaveStatus} onChange={handleStatusChange}>
                    <option>All</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="searchQuery" className="mt-3">
                <Form.Label>Search:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search by name or designation"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Form.Group>

            <Button className="mt-3" variant="primary" onClick={fetchApplicationsByDate} disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Fetch Applications"}
            </Button>

            {applications.length > 0 ? (
                <Table striped bordered hover responsive className="mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Sub Designation</th>
                            <th>Ministry</th>
                            <th>Leave Days (Casual)</th>
                            <th>Leave Days (Vacation)</th>
                            <th>Leave Days (Other)</th>
                            <th>Date of First Appointment</th>
                            <th>Commence Leave Date</th>
                            <th>Resume Duties Date</th>
                            <th>Reason for Leave</th>
                            <th>Applicant Signature</th>
                            <th>Signature of the Acting Officer</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id}>
                                <td>{app.name}</td>
                                <td>{app.designation}</td>
                                <td>{app.subDesignation}</td>
                                <td>{app.ministry}</td>
                                <td>{app.leaveDaysC}</td>
                                <td>{app.leaveDaysV}</td>
                                <td>{app.leaveDaysO}</td>
                                <td>{new Date(app.firstAppointmentDate).toLocaleDateString()}</td>
                                <td>{new Date(app.commenceLeaveDate).toLocaleDateString()}</td>
                                <td>{new Date(app.resumeDutiesDate).toLocaleDateString()}</td>
                                <td>{app.reasonForLeave}</td>
                                <td>
                                     <Image
                                         src={app.applicantSignature ? `http://localhost:8093/uploads_LeaveApplicant/${app.applicantSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                         alt="Applicant Signature"
                                         style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                     />
                                </td>
                                <td>
                                    <Image
                                         src={app.officerActingSignature ? `http://localhost:8093/uploads_LeaveApplicant/${app.officerActingSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                         alt="Officer Acting Signature"                                        style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'; }}
                                     />
                                </td>

                                
                                <td>{app.status}</td>




                                <td>
                                    <Button
                                        variant="info"
                                        className="me-2"
                                        onClick={() => handleViewDetails(app)}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        variant="success"
                                        className="me-2"
                                        onClick={() => handleTakeAction(app, 1)}
                                    >
                                        Action 1
                                    </Button>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleTakeAction(app, 2)}
                                    >
                                        Action 2
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="me-2"
                                        onClick={() => handleTakeAction(app, 3)}
                                    >
                                        Action 3
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => handleCloseApplication(app._id)}
                                    >
                                        Close Application
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-4">No applications found for the selected date and status.</p>
            )}

            {/* View Details Modal */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        {selectedApplication ? (
                            <Table striped bordered hover responsive>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{selectedApplication.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Designation</th>
                                        <td>{selectedApplication.designation}</td>
                                    </tr>
                                    <tr>
                                        <th>Sub Designation</th>
                                        <td>{selectedApplication.subDesignation}</td>
                                    </tr>
                                    <tr>
                                        <th>Ministry</th>
                                        <td>{selectedApplication.ministry}</td>
                                    </tr>
                                    <tr>
                                        <th>Leave Days (Casual)</th>
                                        <td>{selectedApplication.leaveDaysC}</td>
                                    </tr>
                                    <tr>
                                        <th>Leave Days (Vacation)</th>
                                        <td>{selectedApplication.leaveDaysV}</td>
                                    </tr>
                                    <tr>
                                        <th>Leave Days (Other)</th>
                                        <td>{selectedApplication.leaveDaysO}</td>
                                    </tr>
                                    <tr>
                                        <th>Date of First Appointment</th>
                                        <td>{selectedApplication.firstAppointmentDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Commence Leave Date</th>
                                        <td>{new Date(selectedApplication.commenceLeaveDate).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Resume Duties Date</th>
                                        <td>{new Date(selectedApplication.resumeDutiesDate).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Reason</th>
                                        <td>{selectedApplication.reason || "Not provided"}</td>
                                    </tr>
                                                                        <tr>
                                        <th>Applicant Signature</th>
                                        <td>
                                            <img
                                                src={
                                                    selectedApplication?.applicantSignature
                                                        ? `http://localhost:8093/uploads_LeaveApplicant/${selectedApplication.applicantSignature}`
                                                        : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'
                                                }
                                                alt="Applicant Signature"
                                                style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Signature of the Actiong Officer</th>
                                        <td>
                                            <img
                                                src={
                                                    selectedApplication?.applicantSignature
                                                        ? `http://localhost:8093/uploads_LeaveApplicant/${selectedApplication.officerActingSignature}`
                                                        : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'
                                                }
                                                alt="Acting Officer Signature"
                                                style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{selectedApplication.status}</td>
                                    </tr>

                                </tbody>
                            </Table>
                        ) : (
                            <p>No details available.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>



         {/* Take Action Modal 1 */}
<Modal show={showActionModal1} onHide={() => setShowActionModal1(false)} centered>
    <Modal.Header closeButton>
        <Modal.Title>{`Take Action ${actionStep}`}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Recommendation by Supervising Officer</Form.Label>
                <Form.Control as="select">
                    <option>Recommended</option>
                    <option>Not Recommended</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Signature</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowActionModal1(false)}>
            Close
        </Button>
        <Button variant="primary" >Submit</Button>
    </Modal.Footer>
</Modal>

{/* Take Action Modal 2 */}
<Modal show={showActionModal2} onHide={() => setShowActionModal2(false)} centered>
    <Modal.Header closeButton>
        <Modal.Title>{`Take Action ${actionStep}`}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Allowed by Head of Department</Form.Label>
                <Form.Control as="select">
                    <option>Allowed</option>
                    <option>Not Allowed</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Signature</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowActionModal2(false)}>
            Close
        </Button>
        <Button variant="primary" >Submit</Button>
    </Modal.Footer>
</Modal>

{/* Take Action Modal 3 */}
<Modal show={showActionModal3} onHide={() => setShowActionModal3(false)} centered>
    <Modal.Header closeButton>
        <Modal.Title>{`Take Action ${actionStep}`}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Final Approval by Leave Clerk</Form.Label>
                <Form.Control as="select">
                    <option>Approved</option>
                    <option>Not Approved</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Signature</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowActionModal3(false)}>
            Close
        </Button>
        <Button variant="primary">Submit</Button>
    </Modal.Footer>
</Modal>




        </div>
    );
}

export default LeaveApplicationsByDate;
