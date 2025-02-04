import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Spinner, Card, Badge } from "react-bootstrap";
import AdminNavBar from '../Pages/AdminNavBar';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './LoginIcon.css';





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
    const [supervisingOfficerName, setSupervisingOfficerName] = useState("");
    const [role, setRole] = useState("");
    const [signature1, setSignature1] = useState(null);

    // State to track action completion status
    const [actionStatus, setActionStatus] = useState(() => {
        const savedActionStatus = localStorage.getItem("actionStatus");
        return savedActionStatus ? JSON.parse(savedActionStatus) : {};
    });

    // Save actionStatus to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("actionStatus", JSON.stringify(actionStatus));
    }, [actionStatus]);

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
            const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/getByDate`, { params: { date } });
            const leaveApplications = response.data.applications;

            const matchedApplications = leaveApplications.map(app => {
                const isValid = membersData.find(member => member.fullName === app.name && member.designation === app.designation);
                return {
                    ...app,
                    status: app.isValid ? "Approved" : "Rejected",
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
        setSelectedApplication(application);
        setShowDetailsModal(true);
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

    // Handle submission for Action 1
    const handleSubmit1 = async () => {
        if (!selectedApplication) return;

        const applicationId = selectedApplication._id;

        if (actionStatus[applicationId]?.isCompleted1) return; // Prevent multiple submissions

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
                    isCompleted1: true,
                    completedActions: (prevState[applicationId]?.completedActions || 0) + 1,
                },
            }));
        } catch (error) {
            console.error('Error submitting the form:', error);
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
            case 'Pending':
                badgeColor = 'warning';
                break;
            case 'Completed':
                badgeColor = 'success';
                break;
            default:
                badgeColor = 'secondary';
        }
        return <Badge bg={badgeColor}>{status}</Badge>;
    };

    // Application Row Component
    const ApplicationRow = ({ app, actionStatus, handleTakeAction }) => {
        const progress = (actionStatus[app._id]?.completedActions || 0) * 33.33; // 33.33% per action
        return (
            <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.designation}</td>
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
                        className="me-2"
                        onClick={() => handleTakeAction(app, 1)}
                        disabled={actionStatus[app._id]?.isCompleted1}
                    >
                        Action 1
                    </Button>
                    <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleTakeAction(app, 2)}
                        disabled={actionStatus[app._id]?.isCompleted2}
                    >
                        Action 2
                    </Button>
                    <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => handleTakeAction(app, 3)}
                        disabled={actionStatus[app._id]?.isCompleted3}
                    >
                        Action 3
                    </Button>
                </td>
            </tr>
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
            <Button className="mt-3" variant="primary" onClick={fetchApplicationsByDate} disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Fetch Applications"}
            </Button>

            {/* Desktop View */}
            <div className="d-none d-md-block">
                <Table striped bordered hover responsive className="mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Progress</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map(app => (
                            <ApplicationRow
                                key={app._id}
                                app={app}
                                actionStatus={actionStatus}
                                handleTakeAction={handleTakeAction}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Mobile View */}
            <div className="d-block d-md-none">
                {filteredApplications.map(app => (
                    <Card key={app._id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{app.name}</Card.Title>
                            <Card.Text>{app.designation}</Card.Text>
                            <ProgressBar progress={(actionStatus[app._id]?.completedActions || 0) * 33.33} />
                            <div className="mt-2">
                                <StatusBadge status={actionStatus[app._id]?.isCompleted1 ? 'Completed' : 'Pending'} /> Action 1
                                <br />
                                <StatusBadge status={actionStatus[app._id]?.isCompleted2 ? 'Completed' : 'Pending'} /> Action 2
                                <br />
                                <StatusBadge status={actionStatus[app._id]?.isCompleted3 ? 'Completed' : 'Pending'} /> Action 3
                            </div>
                            <div className="mt-2">
                                <Button
                                    variant="success"
                                    className="me-2"
                                    onClick={() => handleTakeAction(app, 1)}
                                    disabled={actionStatus[app._id]?.isCompleted1}
                                >
                                    Action 1
                                </Button>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => handleTakeAction(app, 2)}
                                    disabled={actionStatus[app._id]?.isCompleted2}
                                >
                                    Action 2
                                </Button>
                                <Button
                                    variant="danger"
                                    className="me-2"
                                    onClick={() => handleTakeAction(app, 3)}
                                    disabled={actionStatus[app._id]?.isCompleted3}
                                >
                                    Action 3
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
        {/*.......................................................For Footer................................................ */}
        
         <Footer/>
        
        </div>
    );
}

export default LeaveApplicationsByDate;