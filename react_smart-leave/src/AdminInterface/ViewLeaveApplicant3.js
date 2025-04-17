import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Image, Spinner } from "react-bootstrap";
import './LoginIcon.css';
import AdminNavBar from '../Pages/AdminNavBar';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';
import { useNavigate } from 'react-router-dom';

function LeaveApplicationsByDate() {
    const [logoutMessage, setLogoutMessage] = useState('');
    const navigate = useNavigate();
      
    function logout() {
        localStorage.removeItem('token');
        setLogoutMessage('You have been logged out successfully.');
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
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
    const [selectedApplication, setSelectedApplication] = useState(null);

    // State for form inputs
    const [recommendation, setRecommendation] = useState("");
    const [supervisingOfficerName, setSupervisingOfficerName] = useState("");
    const [role, setRole] = useState("");
    const [signature1, setSignature1] = useState(null);

    // State to track success messages
    const [actionStatus, setActionStatus] = useState(() => {
        const savedActionStatus = localStorage.getItem("actionStatus");
        return savedActionStatus ? JSON.parse(savedActionStatus) : {};
    });

    // Fetch members data on component mount
    useEffect(() => {
        const fetchMembersData = async () => {
            try {
                const response = await axios.get(`http://localhost:8093/Member`);
                setMembersData(response.data || []);
            } catch (error) {
                console.error("Error fetching members data:", error);
                setMembersData([]);
            }
        };
        fetchMembersData();
    }, []);

    // Fetch applications by date
    const fetchApplicationsByDate = async () => {
        setIsLoading(true);
        try {
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

    // Filter applications
    const filteredApplications = applications.filter(app => {
        const matchesStatus = leaveStatus === "All" || app.status === leaveStatus;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.designation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Handle viewing details
    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    // Handle taking action
    const handleTakeAction = (application, action) => {
        setSelectedApplication(application);
        
        setShowActionModal1(true);
    };

    // Check if name and role match
    const isNameAndRoleValid = (supervisingOfficerName, role) => {
        if (!supervisingOfficerName || !role || !membersData || !Array.isArray(membersData)) return false;
        return membersData.some(member => 
            member.fullName.toLowerCase() === supervisingOfficerName.trim().toLowerCase() && 
            member.role.toLowerCase() === role.trim().toLowerCase()
        );
    };

    // Handle submission for Action 1
    const handleSubmit1 = async () => {
        if (!selectedApplication) return;
        const applicationId = selectedApplication._id;

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

    // Reset form
    const resetForm = () => {
        setRecommendation("");
        setSupervisingOfficerName("");
        setRole("");
        setSignature1(null);
        setSelectedApplication(null);
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="row1 mb-0">
                <div className="col-sm-12 p-0" style={{ marginRight: '0PX', padding: '0px' }}>
                    <div className="p-1 mb-2 bg-black text-white d-flex align-items-center justify-content-between">
                        <div className="col-sm-8">
                            <div className="h6">
                                <div className="contact-info d-flex align-items-center">
                                    <img src={Icon1} className="icon" alt="Web-site link" />
                                    <span className="email">info@smartLeave.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="button-container ml-auto">
                                <Button onClick={()=>navigate("/Login")} variant="btn btn-warning twinkle-button" className="mx-2 small-button main-button">Sign In</Button>
                                <Button onClick={logout} variant="warning" className="mx-2 small-button main-button">Log Out</Button>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <div className="icon-container">
                                <img src={Icon2} className="icon2" alt="Web-site link" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdminNavBar/>     
            
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
                        borderColor: "#022B23",
                        color: "white",
                        padding: "10px 20px", 
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)"
                    }}
                >
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Fetch Applications"}
                </Button>

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
                                        <Button 
                                            variant="warning" 
                                            className="me-2" 
                                            disabled
                                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                        >
                                            Action 2
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            className="me-2" 
                                            disabled
                                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                        >
                                            Action 3
                                        </Button>
                                        <Button variant="secondary" onClick={() => {}}>
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
                    {/* Modal content remains the same */}
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
            </div>
            
            <Footer/>
        </div>
    );
}

export default LeaveApplicationsByDate;