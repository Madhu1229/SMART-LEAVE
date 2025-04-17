import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Image, Spinner } from "react-bootstrap";
import './LoginIcon.css';
import AdminNavBar from '../Pages/AdminNavBar';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';



function LeaveApplicationsByDate() {


    const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message
        const navigate = useNavigate(); // Create navigate function
      
        function logout() {
          localStorage.removeItem('token');
          setLogoutMessage('You have been logged out successfully.'); // Set the logout message
          setTimeout(() => {
            window.location.href = '/'; // Redirect to the login page after 3 seconds
          }, 3000); // Delay the redirect for 3 seconds to show the message
        }
        
    // State for filters and data
    const [date, setDate] = useState("");
    const [leaveStatus, setLeaveStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [applications, setApplications] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showActionModal1, setShowActionModal1] = useState(false);
    const [showActionModal2, setShowActionModal2] = useState(false);
    const [showActionModal3, setShowActionModal3] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [actionStep, setActionStep] = useState(null);

    // State for form inputs
    const [recommendation, setRecommendation] = useState("");
    const [allowedByHead, setAllowedByHead] = useState("");
    const [finalApproval, setFinalApproval] = useState("");
    const [supervisingOfficerName, setSupervisingOfficerName] = useState("");
    const [headOfDepartmentName, setHeadOfDepartmentName] = useState("");
    const [leaveClerkName, setLeaveClerkName] = useState("");
    const [role, setRole] = useState("");
    const [signature1, setSignature1] = useState(null);
    const [signature2, setSignature2] = useState(null);
    const [signature3, setSignature3] = useState(null);

    // State to track success messages and completion status for each application
    const [actionStatus, setActionStatus] = useState(() => {
        const savedActionStatus = localStorage.getItem("actionStatus");
        return savedActionStatus ? JSON.parse(savedActionStatus) : {};
    });

    // State for matched data
    const [matchedData, setMatchedData] = useState([]);
    const [isFetchingMatchedData, setIsFetchingMatchedData] = useState(false);
    const [matchedDataError, setMatchedDataError] = useState(null);

    // Save actionStatus to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("actionStatus", JSON.stringify(actionStatus));
    }, [actionStatus]);

    // Fetch members data on component mount
useEffect(() => {
    const fetchMembersData = async () => {
        try {
            const response = await axios.get(`http://localhost:8093/Member`);
            console.log("Members Data:", response.data); // Log the entire response
            setMembersData(response.data || []); // Set the array directly
        } catch (error) {
            console.error("Error fetching members data:", error);
            setMembersData([]); // Set to empty array on error
        }
    };
    fetchMembersData();
}, []);

    // // Fetch matched data on component mount
    // useEffect(() => {
    //     fetchMatchedData();
    // }, []);

    // Fetch matched data on component mount
useEffect(() => {
    const fetchMatchedData = async () => {
        setIsFetchingMatchedData(true);
        setMatchedDataError(null);
        try {
            const response = await axios.get(`http://localhost:8093/Take_Actions1/match-members`);
            console.log("Matched Data Response:", response.data); // Log the entire response
            if (response.data && Array.isArray(response.data.data)) {
                setMatchedData(response.data.data);
            } else {
                console.error("Unexpected response structure:", response.data);
                setMatchedDataError("Unexpected response structure from the server.");
            }
        } catch (error) {
            console.error("Error fetching matched data:", error);
            setMatchedDataError("Failed to fetch matched data. Please try again.");
        } finally {
            setIsFetchingMatchedData(false);
        }
    };
    fetchMatchedData();
}, []);


    // Fetch applications by date
    const fetchApplicationsByDate = async () => {
        setIsLoading(true);
        try {
            // Ensure membersData is available
            if (!membersData || !Array.isArray(membersData)) {
                console.error("Members data is not available.");
                return;
            }

            const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/getByDate`, { params: { date } });
            const leaveApplications = response.data.applications;

            const matchedApplications = leaveApplications.map(app => {
                const isValid = membersData.find(member => member.fullName === app.name);
                return {
                    ...app,
                    status: isValid ? "Approved" : "Rejected",
                };
            });

            setApplications(matchedApplications);
        } catch (error) {
            console.error("Error fetching applications:", error.response ? error.response.data : error.message);
            alert("Error fetching applications. Check the console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    // Format date
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    // Filter applications based on selected leaveStatus and search query
    const filteredApplications = applications.filter(app => {
        const matchesStatus = leaveStatus === "All" || app.status === leaveStatus;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.designation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Handle viewing details of an application
    const handleViewDetails = (application) => {
        console.log("Selected Application:", application); // Debugging
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };
    // Handle closing an application
    const handleCloseApplication = (applicationId) => {
        alert(`Application with ID: ${applicationId} has been successfully closed.`);
    };

    // Handle taking action on an application
    const handleTakeAction = (application, action) => {
        setSelectedApplication(application);
        setActionStep(action);

        // Show the correct modal based on action
        if (action === 1) {
            setShowActionModal1(true);
        } else if (action === 2) {
            setShowActionModal2(true);
        } else if (action === 3) {
            setShowActionModal3(true);
        }
    };

    // Check if name and role match a member in membersData
    const isNameAndRoleValid = (supervisingOfficerName, role) => {
        if (!supervisingOfficerName || !role || !membersData || !Array.isArray(membersData)) return false;

        const normalizedOfficerName = supervisingOfficerName.trim().toLowerCase();
        const normalizedRole = role.trim().toLowerCase();

        return membersData.some(member => 
            member.fullName.toLowerCase() === normalizedOfficerName && 
            member.role.toLowerCase() === normalizedRole
        );
    };

    // Handle submission for Action 1
    const handleSubmit1 = async () => {
        if (!selectedApplication) return;

        const applicationId = selectedApplication._id;

        if (actionStatus[applicationId]?.isCompleted1) return; // Prevent multiple submissions

        // Check if name and role are valid
        if (!isNameAndRoleValid(supervisingOfficerName, role)) {
            alert("Name and role do not match. Please use the correct details.");
            return;
        }

        const formData = new FormData();
        formData.append('recommendation', recommendation);
        formData.append('supervisingOfficerName', supervisingOfficerName);
        formData.append('role', role);
        if (signature1) formData.append('signature1', signature1);

        try {
            await axios.post('http://localhost:8093/Take_Actions1/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Update the state for the specific application
            setActionStatus(prevState => ({
                ...prevState,
                [applicationId]: {
                    ...prevState[applicationId],
                    message1: 'Action 1 was Successfully completed',
                    isCompleted1: true,
                },
            }));
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    // Handle submission for Action 2
    const handleSubmit2 = async () => {
        if (!selectedApplication) return;

        const applicationId = selectedApplication._id;

        if (actionStatus[applicationId]?.isCompleted2) return; // Prevent multiple submissions

        // Check if name and role are valid
        if (!isNameAndRoleValid(headOfDepartmentName, role)) {
            alert("Name and role do not match. Please use the correct details.");
            return;
        }

        const formData = new FormData();
        formData.append('allowedByHead', allowedByHead);
        formData.append('headOfDepartmentName', headOfDepartmentName);
        formData.append('role', role);
        if (signature2) formData.append('signature2', signature2);

        try {
            await axios.post('http://localhost:8093/Take_Actions2/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Update the state for the specific application
            setActionStatus(prevState => ({
                ...prevState,
                [applicationId]: {
                    ...prevState[applicationId],
                    message2: 'Action 2 was Successfully completed',
                    isCompleted2: true,
                },
            }));
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };
// Handle submission for Action 3

const handleSubmit3 = async () => {
    if (!selectedApplication) return; // Ensure selectedApplication is defined

    const applicationId = selectedApplication._id;

    if (actionStatus[applicationId]?.isCompleted3) return; // Prevent multiple submissions

    // Check if name and role are valid
    if (!isNameAndRoleValid(leaveClerkName, role)) {
        alert("Name and role do not match. Please use the correct details.");
        return;
    }

    const formData = new FormData();
    formData.append('finalApproval', finalApproval);
    formData.append('leaveClerkName', leaveClerkName);
    formData.append('role', role);

    if (signature3) formData.append('signature3', signature3);

    try {
        await axios.post('http://localhost:8093/Take_Actions3/add', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Update the state for the specific application
        setActionStatus(prevState => ({
            ...prevState,
            [applicationId]: {
                ...prevState[applicationId],
                message3: 'Action 3 was Successfully completed',
                isCompleted3: true,
            },
        }));
    } catch (error) {
        console.error('Error submitting the form:', error);
    }
};


    // Reset form and modal state when modal is closed
    const resetForm = () => {
        setRecommendation("");
        setAllowedByHead("");
        setFinalApproval("");
        setSupervisingOfficerName("");
        setHeadOfDepartmentName("");
        setLeaveClerkName("");
        setRole("");
        setSignature1(null);
        setSignature2(null);
        setSignature3(null);
        setSelectedApplication(null);
        setActionStep(null);
    };

    // Reusable Matched Data Table Component
    const MatchedDataTable = () => {
        return (
            <div className="container mt-4">
                <h5 className="mb-4">Matched Data</h5>
                {isFetchingMatchedData ? (
                    <Spinner animation="border" size="sm" />
                ) : matchedDataError ? (
                    <p className="text-danger">{matchedDataError}</p>
                ) : matchedData.length > 0 ? (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Supervising Officer Name</th>
                                <th>Role</th>
                                <th>Matched Member</th>
                                <th>Matched Member Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchedData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.supervisingOfficerName}</td>
                                    <td>{data.role}</td>
                                    <td>
                                        {data.matchedMember ? (
                                            data.matchedMember.fullName
                                        ) : (
                                            <span style={{ color: "red" }}>No match found</span>
                                        )}
                                    </td>
                                    <td>
                                        {data.matchedMember ? (
                                            data.matchedMember.role
                                        ) : (
                                            <span style={{ color: "red" }}>N/A</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p className="mt-4">No matched data found.</p>
                )}
            </div>
        );
    };

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



        <div className="container mt-5">
            <h2 className="mb-4">View Leave Applications by Date</h2>
            <Form.Group controlId="date">
                <Form.Label>Select Date:</Form.Label>
                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="leaveStatus" className="mt-3">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" value={leaveStatus} onChange={(e) => setLeaveStatus(e.target.value)}>
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            <Button 
  className="mt-3" 
  variant="primary" 
  onClick={fetchApplicationsByDate} 
  disabled={isLoading}
  style={{ 
    backgroundColor: "#022B23", 
    opacity: "0.9", 
    borderColor: "#022B23", // Match border color
    color: "white", // Ensure text is visible
    padding: "10px 20px", 
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    backdropFilter: "blur(10px)", // Apply blur effect
    WebkitBackdropFilter: "blur(10px)" // Safari support
  }}
>
  {isLoading ? <Spinner animation="border" size="sm" /> : "Fetch Applications"}
</Button>


            {/* Render applications table */}
            {filteredApplications.length > 0 ? (
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
                        {filteredApplications.map(app => (
                            <tr key={app._id}>
                                <td>{app.name}</td>
                                <td>{app.designation}</td>
                                <td>{app.subDesignation}</td>
                                <td>{app.ministry}</td>
                                <td>{app.leaveDaysC}</td>
                                <td>{app.leaveDaysV}</td>
                                <td>{app.leaveDaysO}</td>
                                <td>{formatDate(app.firstAppointmentDate)}</td>
                                <td>{formatDate(app.commenceLeaveDate)}</td>
                                <td>{formatDate(app.resumeDutiesDate)}</td>
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
                                        alt="Officer Acting Signature"
                                        style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'; }}
                                    />
                                </td>
                                <td>{app.status}</td>
                                <td>
                                    <Button variant="info" className="me-2" onClick={() => handleViewDetails(app)}>
                                        View Details
                                    </Button>
                                    <Button variant="success" className="me-2" onClick={() => handleTakeAction(app, 1)}>
                                        Action 1
                                    </Button>
                                    {actionStatus[app._id]?.message1 && (
                                        <p style={{ color: 'green', fontWeight: 'bold' }}>{actionStatus[app._id].message1}</p>
                                    )}
                                    <Button variant="warning" className="me-2" onClick={() => handleTakeAction(app, 2)}>
                                        Action 2
                                    </Button>
                                    {actionStatus[app._id]?.message2 && (
                                        <p style={{ color: 'green', fontWeight: 'bold' }}>{actionStatus[app._id].message2}</p>
                                    )}
                                    <Button variant="danger" className="me-2" onClick={() => handleTakeAction(app, 3)}>
                                        Action 3
                                    </Button>
                                    {actionStatus[app._id]?.message3 && (
                                        <p style={{ color: 'green', fontWeight: 'bold' }}>{actionStatus[app._id].message3}</p>
                                    )}
                                    <Button variant="secondary" onClick={() => handleCloseApplication(app._id)}>
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
                                    <td>{formatDate(selectedApplication.firstAppointmentDate)}</td>
                                </tr>
                                <tr>
                                    <th>Commence Leave Date</th>
                                    <td>{formatDate(selectedApplication.commenceLeaveDate)}</td>
                                </tr>
                                <tr>
                                    <th>Resume Duties Date</th>
                                    <td>{formatDate(selectedApplication.resumeDutiesDate)}</td>
                                </tr>
                                <tr>
                                    <th>Reason for Leave</th>
                                    <td>{selectedApplication.reasonForLeave}</td>
                                </tr>
                                <tr>
                                    <th>Applicant Signature</th>
                                    <td>
                                        <Image
                                            src={selectedApplication.applicantSignature ? `http://localhost:8093/uploads_LeaveApplicant/${selectedApplication.applicantSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                            alt="Applicant Signature"
                                            style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Signature of the Acting Officer</th>
                                    <td>
                                        <Image
                                            src={selectedApplication.officerActingSignature ? `http://localhost:8093/uploads_LeaveApplicant/${selectedApplication.officerActingSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                            alt="Officer Acting Signature"
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

            {/* Action Modals 1*/}
            <Modal show={showActionModal1} onHide={() => { setShowActionModal1(false); resetForm(); }} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Take Action 1</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Recommendation by Supervising Officer</Form.Label>
                            <Form.Control as="select" value={recommendation} onChange={(e) => setRecommendation(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Recommended">Recommended</option>
                                <option value="Not Recommended">Not Recommended</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={supervisingOfficerName}
                                onChange={(e) => setSupervisingOfficerName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select</option>
                                <option value="admin1">Admin I</option>
                                <option value="admin2">Admin II</option>
                                {/* <option value="leaveApplicant">Leave Applicant</option> */}
                            </Form.Control>
                        </Form.Group>
                        {supervisingOfficerName && role && (
                            isNameAndRoleValid(supervisingOfficerName, role) ? (
                                <>
                                    <p className="text-success">Matching details. You can now upload the signature.</p>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Signature</Form.Label>
                                        <Form.Control type="file" onChange={(e) => setSignature1(e.target.files[0])} />
                                    </Form.Group>
                                </>
                            ) : (
                                <p className="text-danger">Your details do not match. Please use the correct name and role.</p>
                            )
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowActionModal1(false); resetForm(); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit1} disabled={selectedApplication && actionStatus[selectedApplication._id]?.isCompleted1}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

{/* Action Modals 2*/}
<Modal show={showActionModal2} onHide={() => { setShowActionModal1(false); resetForm(); }} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Take Action 2</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Allowed by Head of Department</Form.Label>
                            <Form.Control as="select" value={allowedByHead} onChange={(e) => setAllowedByHead(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Allowed">Allowed</option>
                                <option value="Not Allowed">Not Allowed</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={headOfDepartmentName}
                                onChange={(e) => setHeadOfDepartmentName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select</option>
                                <option value="admin1">Admin I</option>
                                <option value="admin2">Admin II</option>
                                {/* <option value="leaveApplicant">Leave Applicant</option> */}
                            </Form.Control>
                        </Form.Group>
                        {headOfDepartmentName && role && (
                            isNameAndRoleValid(headOfDepartmentName, role) ? (
                                <>
                                    <p className="text-success">Matching details. You can now upload the signature.</p>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Signature</Form.Label>
                                        <Form.Control type="file" onChange={(e) => setSignature2(e.target.files[0])} />
                                    </Form.Group>
                                </>
                            ) : (
                                <p className="text-danger">Your details do not match. Please use the correct name and role.</p>
                            )
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowActionModal2(false); resetForm(); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit2} disabled={selectedApplication && actionStatus[selectedApplication._id]?.isCompleted2}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Action Modals 3*/}
<Modal show={showActionModal3} onHide={() => { setShowActionModal3(false); resetForm(); }} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Take Action 3</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Final Approval by Leave Clerk</Form.Label>
                            <Form.Control as="select" value={setFinalApproval} onChange={(e) => setFinalApproval(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Approved">Approved</option>
                                <option value="Not Approved">Not Approved</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={leaveClerkName}
                                onChange={(e) => setLeaveClerkName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select</option>
                                <option value="admin1">Admin I</option>
                                <option value="admin2">Admin II</option>
                                {/* <option value="leaveApplicant">Leave Applicant</option> */}
                            </Form.Control>
                        </Form.Group>
                        {leaveClerkName && role && (
                            isNameAndRoleValid(leaveClerkName, role) ? (
                                <>
                                    <p className="text-success">Matching details. You can now upload the signature.</p>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Signature</Form.Label>
                                        <Form.Control type="file" onChange={(e) => setSignature3(e.target.files[0])} />
                                    </Form.Group>
                                </>
                            ) : (
                                <p className="text-danger">Your details do not match. Please use the correct name and role.</p>
                            )
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowActionModal3(false); resetForm(); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit3} disabled={selectedApplication && actionStatus[selectedApplication._id]?.isCompleted3}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

           
        </div>
        {/*.......................................................For Footer................................................ */}
        
         <Footer/>
        
        </div>
    );
}

export default LeaveApplicationsByDate;  