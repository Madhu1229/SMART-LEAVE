import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Image, Spinner } from "react-bootstrap";
import SignatureCanvas from 'react-signature-canvas';
import './LoginIcon.css';
import AdminNavBar from '../Pages/AdminNavBar';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';
import { useNavigate } from 'react-router-dom';
import './LeaveApplicant.css';

function LeaveApplicationsByDate() {
    const [logoutMessage, setLogoutMessage] = useState('');
    const navigate = useNavigate();
    const sigCanvas = useRef(null);
      
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
    const [isMembersLoading, setIsMembersLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showActionModal1, setShowActionModal1] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    // State for form inputs
    const [recommendation, setRecommendation] = useState("");
    const [supervisingOfficerName, setSupervisingOfficerName] = useState("");
    const [role, setRole] = useState("");
    const [signatureData, setSignatureData] = useState(null);

    // State to track success messages
    const [actionStatus, setActionStatus] = useState(() => {
        const savedActionStatus = localStorage.getItem("actionStatus");
        return savedActionStatus ? JSON.parse(savedActionStatus) : {};
    });

    // Set today's date on component mount
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, []);

    // Fetch members data on component mount
    useEffect(() => {
        const fetchMembersData = async () => {
            try {
                setIsMembersLoading(true);
                const response = await axios.get(`http://localhost:8093/Member`);
                setMembersData(response.data || []);
            } catch (error) {
                console.error("Error fetching members data:", error);
                setMembersData([]);
            } finally {
                setIsMembersLoading(false);
            }
        };
        fetchMembersData();
    }, []);

    // Fetch applications when date or membersData changes
    useEffect(() => {
        if (date && membersData.length > 0) {
            fetchApplicationsByDate();
        }
    }, [date, membersData]);

    // Fetch applications by date
    const fetchApplicationsByDate = async () => {
        if (!membersData || membersData.length === 0) return;
        
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/getByDate`, { 
                params: { date } 
            });
            const leaveApplications = response.data.applications || [];
    
            const matchedApplications = leaveApplications.map(app => {
                // Find potential matches by name
                const potentialMatches = membersData.filter(m => 
                    m.fullName.toLowerCase().trim() === app.name.toLowerCase().trim()
                );
                
                let status = "Rejected";
                let errorMessages = [];
                let member = null;
            
                // ===== 1. Check Member Match =====
                if (potentialMatches.length > 0) {
                    // Try to find an exact match (all fields correct)
                    member = potentialMatches.find(m => 
                        m.designation.toLowerCase().trim() === app.designation.toLowerCase().trim() &&
                        // m.subDesignation.toLowerCase().trim() === app.subDesignation.toLowerCase().trim() &&
                        m.ministry.toLowerCase().trim() === app.ministry.toLowerCase().trim() &&
                        new Date(m.joiningDate).toISOString() === new Date(app.firstAppointmentDate).toISOString()
                    );
            
                    // If no exact match, list mismatched fields for closest match
                    if (!member) {
                        const partialMatch = potentialMatches[0]; // Take the first potential match
                        const mismatches = [];
                        
                        if (partialMatch.designation.toLowerCase().trim() !== app.designation.toLowerCase().trim()) {
                            mismatches.push(`designation (${app.designation} ≠ ${partialMatch.designation})`);
                        }
                        // if (partialMatch.subDesignation.toLowerCase().trim() !== app.subDesignation.toLowerCase().trim()) {
                        //     mismatches.push(`sub-designation (${app.subDesignation} ≠ ${partialMatch.subDesignation})`);
                        // }
                        if (partialMatch.ministry.toLowerCase().trim() !== app.ministry.toLowerCase().trim()) {
                            mismatches.push(`ministry (${app.ministry} ≠ ${partialMatch.ministry})`);
                        }
                        if (new Date(partialMatch.joiningDate).toISOString() !== new Date(app.firstAppointmentDate).toISOString()) {
                            mismatches.push(`first appointment date (${app.firstAppointmentDate} ≠ ${partialMatch.joiningDate})`);
                        }
                        
                        if (mismatches.length > 0) {
                            errorMessages.push(`Potential match for ${partialMatch.fullName} but mismatched fields: ${mismatches.join(', ')}`);
                        }
                    }
                } else {
                    errorMessages.push("No member found with this name");
                }
            
                // ===== 2. Check Leave Calculations (if a member was found, even if fields don't match) =====
                if (potentialMatches.length > 0) {
                    const closestMatch = potentialMatches[0]; // Use the closest match for leave validation
                    
                    // Check if requested leave exceeds remaining leave
                    const totalLeaveRequested = app.leaveDaysC + app.leaveDaysV + app.leaveDaysO;
                    if (totalLeaveRequested > closestMatch.leaveRemaining) {
                        errorMessages.push(`Total requested leave (${totalLeaveRequested}) exceeds remaining leave (${closestMatch.leaveRemaining})`);
                    }
            
                    // Check if leave taken matches records
                    const leaveTakenSum = app.leaveTakenC + app.leaveTakenV + app.leaveTakenO;
                    if (leaveTakenSum !== closestMatch.leaveTaken) {
                        errorMessages.push(`Sum of leave taken (${leaveTakenSum}) doesn't match member's total leave taken (${closestMatch.leaveTaken})`);
                    }
                }
            
                // Only approve if no errors exist (perfect match + valid leave)
                if (member && errorMessages.length === 0) {
                    status = "Approved";
                }
                
                return {
                    ...app,
                    status: status,
                    errors: errorMessages.length > 0 ? errorMessages : null,
                    memberDetails: member || null
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

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    // Filter applications
    const filteredApplications = applications.filter(app => {
        const matchesStatus = leaveStatus === "All" || app.status === leaveStatus;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.designation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Check if name and role match
    const isNameAndRoleValid = (supervisingOfficerName, role) => {
        if (!supervisingOfficerName || !role || !membersData || !Array.isArray(membersData)) return false;
        return membersData.some(member => 
            member.fullName.toLowerCase() === supervisingOfficerName.trim().toLowerCase() && 
            member.role.toLowerCase() === role.trim().toLowerCase() 
        );
    };

    // Handle viewing details
    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowDetailsModal(true);
    };

    // Handle taking action
    const handleTakeAction = (application) => {
        setSelectedApplication(application);
        setShowActionModal1(true);
    };

    // Clear signature
    const clearSignature = () => {
        sigCanvas.current.clear();
        setSignatureData(null);
    };

    // Handle submission for Action 1
    const handleSubmit1 = async () => {
        if (!selectedApplication) return;
        const applicationId = selectedApplication._id;
    
        if (!isNameAndRoleValid(supervisingOfficerName, role)) {
            alert("Name and role do not match. Please use the correct details.");
            return;
        }
    
        try {
            if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
                alert("Please provide a signature");
                return;
            }
    
            // Get signature as data URL
            const signatureDataUrl = sigCanvas.current.toDataURL('image/png');
            
            // Convert data URL to blob
            const response = await fetch(signatureDataUrl);
            const signatureBlob = await response.blob();
    
            // Generate unique filename with timestamp and application ID
            const timestamp = new Date().getTime();
            const signatureFilename = `signature_${applicationId}_${timestamp}.png`;
    
            const formData = new FormData();
            formData.append('recommendation', recommendation);
            formData.append('supervisingOfficerName', supervisingOfficerName);
            formData.append('role', role);
            formData.append('signature1', signatureBlob, signatureFilename); // Use unique filename
            formData.append('applicationId', applicationId);
    
            // First submit the action data
            const actionResponse = await axios.post(
                'http://localhost:8093/Take_Actions1/add', 
                formData, 
                {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            // Then send notification if needed
            try {
                const member = membersData.find(m => 
                    m.fullName.toLowerCase() === selectedApplication.name.toLowerCase()
                );
                
                if (member && member.email) {
                    await axios.post('http://localhost:8093/api/send-notification', {
                        application: selectedApplication,
                        actionDetails: {
                            actionNumber: 1,
                            actionName: "Supervising Officer Recommendation",
                            status: recommendation === "Recommended" ? "Approved" : "Rejected",
                            processedBy: supervisingOfficerName,
                            comments: recommendation
                        },
                        applicantEmail: member.email
                    });
                }
            } catch (notificationError) {
                console.warn("Notification failed, but action was recorded:", notificationError);
            }
    
            const updatedStatus = {
                ...actionStatus,
                [applicationId]: {
                    message1: 'Action 1 was Successfully completed',
                    isCompleted1: true,
                }
            };
    
            setActionStatus(updatedStatus);
            localStorage.setItem("actionStatus", JSON.stringify(updatedStatus));
    
            setShowActionModal1(false);
            resetForm();
            fetchApplicationsByDate();
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert(`An error occurred: ${error.response?.data?.message || error.message}`);
        }
    };

    // Reset form
    const resetForm = () => {
        setRecommendation("");
        setSupervisingOfficerName("");
        setRole("");
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
        setSignatureData(null);
        setSelectedApplication(null);
    };

    return (
        <div className="leave-applications-container">
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
            
            {/* Log out message */}
            {logoutMessage && (
                <div className="custom-green-btn" role="alert">
                    {logoutMessage}
                </div>
            )}

            <div className="container-fluid p-5">
                <h1 className="page-title">View Leave Applications by Date</h1>
                
                <div className="filters-section">
                    <div className="filter-row">
                        <div className="filter-group">
                            <label>Select Date:</label>
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="form-control"
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="filter-group">
                            <label>Status:</label>
                            <select 
                                value={leaveStatus} 
                                onChange={(e) => setLeaveStatus(e.target.value)}
                                className="form-control"
                            >
                                <option>All</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Search:</label>
                            <input
                                type="text"
                                placeholder="Search by name or designation"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div className="applications-table-container">
                    {isMembersLoading || isLoading ? (
                        <div className="loading-spinner">
                            <Spinner animation="border" variant="primary" />
                            <p>{isMembersLoading ? "Loading member data..." : "Loading applications..."}</p>
                        </div>
                    ) : filteredApplications.length > 0 ? (
                        <>
                            <div className="table-responsive">
                                <table className="applications-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Sub Designation</th>
                                            <th>Ministry</th>
                                            <th>Casual Leave</th>
                                            <th>Vacation Leave</th>
                                            <th>Other Leave</th>
                                            <th>First Appointment</th>
                                            <th>Leave Start</th>
                                            <th>Leave End</th>
                                            <th>Reason</th>
                                            <th>Applicant Signature</th>
                                            <th>Acting Officer</th>
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
                                                        className="signature-image"
                                                    />
                                                </td>
                                                <td>
                                                    <Image
                                                        src={app.officerActingSignature ? `http://localhost:8093/uploads_LeaveApplicant/${app.officerActingSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                                        alt="Officer Acting Signature"
                                                        className="signature-image"
                                                    />
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-buttons d-flex flex-column gap-2">
                                                        <Button className="info custom-green-btn" onClick={() => handleViewDetails(app)}>
                                                            View
                                                        </Button>
                                                        <Button 
                                                            variant="danger" 
                                                            onClick={() => handleTakeAction(app)}
                                                            disabled={actionStatus[app._id]?.isCompleted1}
                                                            className={actionStatus[app._id]?.isCompleted1 ? "completed" : ""}
                                                        >
                                                            Action 1
                                                        </Button>
                                                        {actionStatus[app._id]?.message1 && (
                                                            <div className="action-message">
                                                                {actionStatus[app._id].message1}
                                                            </div>
                                                        )}
                                                        <Button variant="warning" disabled>
                                                            Action 2
                                                        </Button>
                                                        <Button variant="success" disabled>
                                                            Action 3
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="no-applications">
                            <p>No applications found for the selected date and status.</p>
                        </div>
                    )}
                </div>

                {/* View Details Modal */}
                <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered className="details-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Application Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedApplication && (
                            <div className="application-details">
                                <table className="details-table">
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
                                        {selectedApplication.errors && (
                                            <tr>
                                                <th>Error Details</th>
                                                <td>
                                                    <ul className="error-list">
                                                        {selectedApplication.errors.map((error, index) => (
                                                            <li key={index} className="error-item">
                                                                {error}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                
                {/* Action Modal 1 with Digital Signature */}
                <Modal show={showActionModal1} onHide={() => { setShowActionModal1(false); resetForm(); }} centered size="lg" className="action-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Take Action 1 - Digital Signature</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="action-form">
                            <Form.Group>
                                <Form.Label>Recommendation by Supervising Officer</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    value={recommendation} 
                                    onChange={(e) => setRecommendation(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Recommended">Recommended</option>
                                    <option value="Not Recommended">Not Recommended</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
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
                                <Form.Control 
                                    as="select" 
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="admin1">Admin I</option>
                                </Form.Control>
                            </Form.Group>
                            {supervisingOfficerName && role && (
                                isNameAndRoleValid(supervisingOfficerName, role) ? (
                                    <>
                                        <div className="signature-section">
                                            <Form.Label>Digital Signature</Form.Label>
                                            <div className="signature-canvas-container">
                                                <SignatureCanvas
                                                    ref={sigCanvas}
                                                    canvasProps={{
                                                        className: 'signature-canvas',
                                                        width: 500,
                                                        height: 200
                                                    }}
                                                />
                                            </div>
                                            <Button 
                                                variant="outline-danger" 
                                                onClick={clearSignature}
                                                className="clear-signature-btn"
                                            >
                                                Clear Signature
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="validation-message error">
                                        Your details do not match. Please use the correct name and role.
                                    </div>
                                )
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setShowActionModal1(false); resetForm(); }}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit1} className="submit-btn">
                            Submit with Signature
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
            <Footer/>
        </div>
    );
}

export default LeaveApplicationsByDate;