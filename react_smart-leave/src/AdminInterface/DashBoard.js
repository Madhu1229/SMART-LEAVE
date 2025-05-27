import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Spinner, Card, Badge } from "react-bootstrap";
import AdminNavBar from '../Pages/AdminNavBar';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';
import { useNavigate } from 'react-router-dom';
import './LoginIcon.css';
import MainTitle from "../Pages/MainTitle";

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

    // State to track action completion status
    const [actionStatus, setActionStatus] = useState(() => {
        const savedActionStatus = localStorage.getItem("actionStatus");
        return savedActionStatus ? JSON.parse(savedActionStatus) : {};
    });

    // Get Sri Lanka's current date in YYYY-MM-DD format
    const getSriLankaDate = () => {
        const now = new Date();
        // Sri Lanka is UTC+5:30
        const offset = 5.5 * 60 * 60 * 1000;
        const sriLankaTime = new Date(now.getTime() + offset);
        
        const year = sriLankaTime.getFullYear();
        const month = String(sriLankaTime.getMonth() + 1).padStart(2, '0');
        const day = String(sriLankaTime.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    };

    // Save actionStatus to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("actionStatus", JSON.stringify(actionStatus));
    }, [actionStatus]);

    // Set initial date and fetch members data on component mount
    useEffect(() => {
        setDate(getSriLankaDate());
        
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

    // Fetch applications when date changes
    useEffect(() => {
        if (date) {
            fetchApplicationsByDate();
        }
    }, [date]);

    // Fetch applications by date
    const fetchApplicationsByDate = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/getByDate`, { 
                params: { date } 
            });
            const leaveApplications = response.data.applications || [];

            const matchedApplications = leaveApplications.map(app => {
                const memberMatch = membersData.find(member => 
                    member.fullName === app.name && 
                    member.designation === app.designation &&
                    member.ministry === app.ministry
                );
                
                return {
                    ...app,
                    status: memberMatch ? "Approved" : "Rejected",
                    memberDetails: memberMatch || null
                };
            });

            setApplications(matchedApplications);
        } catch (error) {
            console.error("Error fetching applications:", error);
            alert("Error fetching applications. Check the console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Filter applications based on selected leaveStatus and search query
    const filteredApplications = applications.filter(app => {
        const matchesStatus = leaveStatus === "All" || app.status === leaveStatus;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.designation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Handle viewing details of an application
    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    // Handle taking action on an application
    const handleTakeAction = (application, action) => {
        setSelectedApplication(application);
        setActionStep(action);

        if (action === 1) {
            setShowActionModal1(true);
        } else if (action === 2) {
            setShowActionModal2(true);
        } else if (action === 3) {
            setShowActionModal3(true);
        }
    };

    // Handle submission for Action 1
    const handleSubmit1 = async () => {
        if (!selectedApplication) return;

        const applicationId = selectedApplication._id;
        if (actionStatus[applicationId]?.isCompleted1) return;

        const formData = new FormData();
        formData.append('applicationId', applicationId);
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
                    isCompleted1: true,
                    completedActions: (prevState[applicationId]?.completedActions || 0) + 1,
                },
            }));
            setShowActionModal1(false);
            setRecommendation("");
            setSupervisingOfficerName("");
            setRole("");
            setSignature1(null);
        } catch (error) {
            console.error('Error submitting Action 1:', error);
            alert(`Error submitting Action 1: ${error.response?.data?.message || error.message}`);
        }
    };

    // Handle submission for Action 2
    const handleSubmit2 = async () => {
        if (!selectedApplication) return;

        const applicationId = selectedApplication._id;
        if (actionStatus[applicationId]?.isCompleted2) return;

        const formData = new FormData();
        formData.append('applicationId', applicationId);
        formData.append('allowedByHead', allowedByHead);
        formData.append('headOfDepartmentName', headOfDepartmentName);
        formData.append('role', role);
        if (signature2) formData.append('signature2', signature2);

        try {
            await axios.post('http://localhost:8093/Take_Actions2/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setActionStatus(prevState => ({
                ...prevState,
                [applicationId]: {
                    ...prevState[applicationId],
                    isCompleted2: true,
                    completedActions: (prevState[applicationId]?.completedActions || 0) + 1,
                },
            }));
            setShowActionModal2(false);
            setAllowedByHead("");
            setHeadOfDepartmentName("");
            setRole("");
            setSignature2(null);
        } catch (error) {
            console.error('Error submitting Action 2:', error);
            alert(`Error submitting Action 2: ${error.response?.data?.message || error.message}`);
        }
    };

    // Handle submission for Action 3
    const handleSubmit3 = async () => {
        if (!selectedApplication) return;

        const applicationId = selectedApplication._id;
        if (actionStatus[applicationId]?.isCompleted3) return;

        const formData = new FormData();
        formData.append('applicationId', applicationId);
        formData.append('finalApproval', finalApproval);
        formData.append('leaveClerkName', leaveClerkName);
        formData.append('role', role);
        if (signature3) formData.append('signature3', signature3);

        try {
            await axios.post('http://localhost:8093/Take_Actions3/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setActionStatus(prevState => ({
                ...prevState,
                [applicationId]: {
                    ...prevState[applicationId],
                    isCompleted3: true,
                    completedActions: (prevState[applicationId]?.completedActions || 0) + 1,
                },
            }));
            setShowActionModal3(false);
            setFinalApproval("");
            setLeaveClerkName("");
            setRole("");
            setSignature3(null);
        } catch (error) {
            console.error('Error submitting Action 3:', error);
            alert(`Error submitting Action 3: ${error.response?.data?.message || error.message}`);
        }
    };

    // Progress Bar Component
    const ProgressBar = ({ progress }) => {
        return (
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progress === 100 ? '#4caf50' : '#2196f3',
                        height: '10px',
                        borderRadius: '5px',
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>
        );
    };

    // Status Badge Component
    const StatusBadge = ({ status }) => {
        let badgeColor = '';
        switch (status) {
            case 'Pending': badgeColor = 'warning'; break;
            case 'Approved': badgeColor = 'success'; break;
            case 'Rejected': badgeColor = 'danger'; break;
            case 'Completed': badgeColor = 'success'; break;
            default: badgeColor = 'secondary';
        }
        return <Badge bg={badgeColor}>{status}</Badge>;
    };

    // Application Row Component
    const ApplicationRow = ({ app, actionStatus, handleTakeAction }) => {
        const progress = (actionStatus[app._id]?.completedActions || 0) * 33.33;
        return (
            <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.designation}</td>
                <td>
                    <StatusBadge status={app.status} />
                </td>
                <td>
                    <ProgressBar progress={progress} />
                    <small>{Math.round(progress)}% completed</small>
                </td>
                <td>
                    <StatusBadge status={actionStatus[app._id]?.isCompleted1 ? 'Completed' : 'Pending'} /> Action 1
                    <br />
                    <StatusBadge status={actionStatus[app._id]?.isCompleted2 ? 'Completed' : 'Pending'} /> Action 2
                    <br />
                    <StatusBadge status={actionStatus[app._id]?.isCompleted3 ? 'Completed' : 'Pending'} /> Action 3
                </td>
                <td>
                    <Button
                        variant="success"
                        className="me-2 mb-1"
                        onClick={() => handleTakeAction(app, 1)}
                        disabled={actionStatus[app._id]?.isCompleted1}
                    >
                        Action 1
                    </Button>
                    <Button
                        variant="warning"
                        className="me-2 mb-1"
                        onClick={() => handleTakeAction(app, 2)}
                        disabled={!actionStatus[app._id]?.isCompleted1 || actionStatus[app._id]?.isCompleted2}
                    >
                        Action 2
                    </Button>
                    <Button
                        variant="danger"
                        className="me-2 mb-1"
                        onClick={() => handleTakeAction(app, 3)}
                        disabled={!actionStatus[app._id]?.isCompleted2 || actionStatus[app._id]?.isCompleted3}
                    >
                        Action 3
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <div className="p-0 mb-0">
            {/* Header */}
            <MainTitle/>
            <AdminNavBar/>
            
            {logoutMessage && (
                <div className="alert alert-success" role="alert">
                    {logoutMessage}
                </div>
            )}
            
            <div className="container mt-5">
                <h2 className="mb-4">View Leave Status by Date</h2>
                
                <div className="row mb-4">
                    <div className="col-md-4">
                        <Form.Group controlId="date">
                            <Form.Label>Select Date:</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)} 
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group controlId="leaveStatus">
                            <Form.Label>Status:</Form.Label>
                            <Form.Control 
                                as="select" 
                                value={leaveStatus} 
                                onChange={(e) => setLeaveStatus(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-4">
                        <Form.Group controlId="searchQuery">
                            <Form.Label>Search:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by name or designation"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-1 d-flex align-items-end">
                        <Button 
                            variant="primary" 
                            onClick={fetchApplicationsByDate} 
                            disabled={isLoading}
                            style={{ 
                                backgroundColor: "#022B23", 
                                borderColor: "#022B23",
                                color: "white",
                            }}
                        >
                            {isLoading ? <Spinner animation="border" size="sm" /> : "Fetch"}
                        </Button>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="d-none d-md-block">
                    <Table striped bordered hover responsive className="mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Status</th>
                                <th>Progress</th>
                                <th>Action Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map(app => (
                                    <ApplicationRow
                                        key={app._id}
                                        app={app}
                                        actionStatus={actionStatus}
                                        handleTakeAction={handleTakeAction}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        {isLoading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            "No applications found for the selected criteria"
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                {/* Mobile View */}
                <div className="d-block d-md-none">
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map(app => (
                            <Card key={app._id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{app.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Designation:</strong> {app.designation}<br />
                                        <strong>Status:</strong> <StatusBadge status={app.status} />
                                    </Card.Text>
                                    <ProgressBar progress={(actionStatus[app._id]?.completedActions || 0) * 33.33} />
                                    <div className="mt-2">
                                        <StatusBadge status={actionStatus[app._id]?.isCompleted1 ? 'Completed' : 'Pending'} /> Action 1
                                        <br />
                                        <StatusBadge status={actionStatus[app._id]?.isCompleted2 ? 'Completed' : 'Pending'} /> Action 2
                                        <br />
                                        <StatusBadge status={actionStatus[app._id]?.isCompleted3 ? 'Completed' : 'Pending'} /> Action 3
                                    </div>
                                    <div className="mt-2 d-flex flex-wrap">
                                        <Button
                                            variant="success"
                                            className="me-2 mb-1"
                                            onClick={() => handleTakeAction(app, 1)}
                                            disabled={actionStatus[app._id]?.isCompleted1}
                                        >
                                            Action 1
                                        </Button>
                                        <Button
                                            variant="warning"
                                            className="me-2 mb-1"
                                            onClick={() => handleTakeAction(app, 2)}
                                            disabled={!actionStatus[app._id]?.isCompleted1 || actionStatus[app._id]?.isCompleted2}
                                        >
                                            Action 2
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="me-2 mb-1"
                                            onClick={() => handleTakeAction(app, 3)}
                                            disabled={!actionStatus[app._id]?.isCompleted2 || actionStatus[app._id]?.isCompleted3}
                                        >
                                            Action 3
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center mt-4">
                            {isLoading ? (
                                <Spinner animation="border" />
                            ) : (
                                "No applications found for the selected criteria"
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Modals */}
            {/* Action 1 Modal */}
            <Modal show={showActionModal1} onHide={() => setShowActionModal1(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Action 1 - Supervising Officer Recommendation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Recommendation</Form.Label>
                            <Form.Control 
                                as="select"
                                value={recommendation}
                                onChange={(e) => setRecommendation(e.target.value)}
                                required
                            >
                                <option value="">Select recommendation</option>
                                <option value="Recommended">Recommended</option>
                                <option value="Not Recommended">Not Recommended</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Supervising Officer Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={supervisingOfficerName}
                                onChange={(e) => setSupervisingOfficerName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select role</option>
                                <option value="Supervising Officer">Supervising Officer</option>
                                <option value="Admin">Admin</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Signature</Form.Label>
                            <Form.Control 
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSignature1(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowActionModal1(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit1}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Action 2 Modal */}
            <Modal show={showActionModal2} onHide={() => setShowActionModal2(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Action 2 - Head of Department Approval</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Decision</Form.Label>
                            <Form.Control 
                                as="select"
                                value={allowedByHead}
                                onChange={(e) => setAllowedByHead(e.target.value)}
                                required
                            >
                                <option value="">Select decision</option>
                                <option value="Allowed">Allowed</option>
                                <option value="Not Allowed">Not Allowed</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Head of Department Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={headOfDepartmentName}
                                onChange={(e) => setHeadOfDepartmentName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select role</option>
                                <option value="Head of Department">Head of Department</option>
                                <option value="Admin">Admin</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Signature</Form.Label>
                            <Form.Control 
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSignature2(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowActionModal2(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit2}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Action 3 Modal */}
            <Modal show={showActionModal3} onHide={() => setShowActionModal3(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Action 3 - Final Approval</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Final Approval</Form.Label>
                            <Form.Control 
                                as="select"
                                value={finalApproval}
                                onChange={(e) => setFinalApproval(e.target.value)}
                                required
                            >
                                <option value="">Select approval</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Leave Clerk Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={leaveClerkName}
                                onChange={(e) => setLeaveClerkName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select role</option>
                                <option value="Leave Clerk">Leave Clerk</option>
                                <option value="Admin">Admin</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Signature</Form.Label>
                            <Form.Control 
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSignature3(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowActionModal3(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit3}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Application Details Modal */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedApplication && (
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Name:</strong> {selectedApplication.name}</p>
                                    <p><strong>Designation:</strong> {selectedApplication.designation}</p>
                                    <p><strong>Sub Designation:</strong> {selectedApplication.subDesignation}</p>
                                    <p><strong>Ministry:</strong> {selectedApplication.ministry}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Status:</strong> <StatusBadge status={selectedApplication.status} /></p>
                                    <p><strong>Leave Start:</strong> {formatDate(selectedApplication.commenceLeaveDate)}</p>
                                    <p><strong>Leave End:</strong> {formatDate(selectedApplication.resumeDutiesDate)}</p>
                                    <p><strong>Reason:</strong> {selectedApplication.reasonForLeave}</p>
                                </div>
                            </div>
                            {selectedApplication.memberDetails && (
                                <div className="mt-3">
                                    <h5>Member Details</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Joining Date:</strong> {formatDate(selectedApplication.memberDetails.joiningDate)}</p>
                                            <p><strong>Leave Taken:</strong> {selectedApplication.memberDetails.leaveTaken}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Leave Remaining:</strong> {selectedApplication.memberDetails.leaveRemaining}</p>
                                            <p><strong>Service No:</strong> {selectedApplication.memberDetails.serviceNo}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <Footer/>
        </div>
    );
}

export default LeaveApplicationsByDate;