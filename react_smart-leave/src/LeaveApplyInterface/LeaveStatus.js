import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Card, 
  Button, 
  Spinner, 
  Alert, 
  ProgressBar, 
  Row, 
  Col, 
  Modal,
  Image,
  Badge
} from 'react-bootstrap';
import './LeaveStatus.css';
import NavBar from '../Pages/NavBar';
import Icon1 from '../Images/Icon1.png';
import Icon2 from '../Images/Icon2.png';
import Footer from '../Pages/Footer';

function LeaveStatus() {
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Logout function
  function logout() {
    localStorage.removeItem('token');
    setLogoutMessage('You have been logged out successfully.');
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  // Fetch user's leave applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from storage:', token); // Debug log
        
        if (!token) {
          console.log('No token found, redirecting to login');
          navigate('/LeaveStatus');
          return;
        }
  
        // Verify token is still valid
        try {
          console.log('Validating token...');
          const validation = await axios.get('http://localhost:8093/auth/validate', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Validation response:', validation.data);
          
          if (!validation.data.valid) {
            console.log('Token invalid, redirecting');
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
        } catch (validationError) {
          console.error("Validation error:", validationError.response?.data || validationError.message);
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        // First get all leave applications for this user
        const leaveResponse = await axios.get(
          'http://localhost:8093/Member_LeaveApplicant/user-applications', 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        // Then get all approval actions
        const [actions1, actions2, actions3] = await Promise.all([
          axios.get('http://localhost:8093/Take_Actions1'),
          axios.get('http://localhost:8093/Take_Actions2'),
          axios.get('http://localhost:8093/Take_Actions3')
        ]);

        // Combine the data
        const enrichedApplications = leaveResponse.data.map(app => {
          // Find matching actions for this application
          const action1 = actions1.data.find(a => a.applicationId === app._id);
          const action2 = actions2.data.find(a => a.applicationId === app._id);
          const action3 = actions3.data.find(a => a.applicationId === app._id);

          return {
            ...app,
            action1,
            action2,
            action3,
            action1Completed: !!action1,
            action2Completed: !!action2,
            action3Completed: !!action3,
            action1Date: action1?.date1,
            action2Date: action2?.date2,
            action3Date: action3?.date3
          };
        });

        setApplications(enrichedApplications);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load leave applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate status information for an application
  const getStatusInfo = (app) => {
    const steps = [
      {
        name: "Supervisor Approval",
        completed: app.action1Completed,
        description: app.action1Completed ? 
          `Approved on ${formatDate(app.action1Date)}` : 
          "Pending supervisor review",
        icon: "📝",
        status: app.action1?.recommendation || "Pending"
      },
      {
        name: "Department Head Approval",
        completed: app.action2Completed,
        description: app.action2Completed ? 
          `Approved on ${formatDate(app.action2Date)}` : 
          "Pending department head review",
        icon: "👔",
        status: app.action2?.allowedByHead || "Pending"
      },
      {
        name: "HR Final Approval",
        completed: app.action3Completed,
        description: app.action3Completed ? 
          `Approved on ${formatDate(app.action3Date)}` : 
          "Pending HR final approval",
        icon: "✅",
        status: app.action3?.finalApproval || "Pending"
      }
    ];

    const completedSteps = steps.filter(step => step.completed).length;
    const percentage = Math.floor((completedSteps / steps.length) * 100);
    const currentStep = steps.findIndex(step => !step.completed) + 1 || steps.length + 1;
    const isComplete = completedSteps === steps.length;

    return {
      steps,
      percentage,
      currentStep,
      isComplete,
      overallStatus: isComplete ? "Approved" : 
                    completedSteps > 0 ? "In Progress" : "Submitted"
    };
  };

  // View application details
  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  // Download approved application
  const handleDownload = async (app) => {
    try {
      // In a real implementation, this would generate a PDF
      // For now, we'll just show an alert
      alert(`Downloading leave application for ${app.name}`);
      
      // This would be the actual implementation:
      // const response = await axios.get(
      //   `http://localhost:8093/leave-applications/${app._id}/download`,
      //   { responseType: 'blob' }
      // );
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `leave-application-${app._id}.pdf`);
      // document.body.appendChild(link);
      // link.click();
    } catch (err) {
      console.error("Error downloading application:", err);
      alert("Failed to download application. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="row1 mb-0">
        <div className="col-sm-12 p-0">
          <div className="p-1 mb-2 bg-black text-white d-flex align-items-center justify-content-between">
            <div className="col-sm-8">
              <div className="h6">
                <div className="contact-info d-flex align-items-center">
                  <img src={Icon1} className="icon" alt="Website link" />
                  <span className="email">info@smartLeave.com</span>
                </div>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="button-container ml-auto">
                <Button 
                  onClick={() => navigate("/Login")} 
                  variant="btn btn-warning twinkle-button" 
                  className="mx-2 small-button main-button"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={logout} 
                  variant="warning" 
                  className="mx-2 small-button main-button"
                >
                  Log Out
                </Button>
              </div>
            </div>

            <div className="col-sm-1">
              <div className="icon-container">
                <img src={Icon2} className="icon2" alt="Website link" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavBar />

      {logoutMessage && (
        <Alert variant="success" className="mb-0">
          {logoutMessage}
        </Alert>
      )}

      <Container className="my-5">
        <h2 className="text-center mb-4" style={{ color: '#053e34' }}>My Leave Applications</h2>
        
        {applications.length === 0 ? (
          <Card className="text-center p-4">
            <Card.Body>
              <Card.Title>No Leave Applications Found</Card.Title>
              <Card.Text>
                You haven't submitted any leave applications yet.
              </Card.Text>
              <Button 
                variant="primary" 
                onClick={() => navigate('/apply-leave')}
                style={{ backgroundColor: '#053e34', borderColor: '#053e34' }}
              >
                Apply for Leave
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {applications.map((app) => {
              const status = getStatusInfo(app);
              
              return (
                <Col key={app._id} xs={12} md={6} lg={4}>
                  <Card className="h-100 shadow-sm">
                    <Card.Header 
                      style={{ 
                        backgroundColor: status.isComplete ? '#053e34' : '#6c757d',
                        color: 'white'
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>
                          {formatDate(app.commenceLeaveDate)} to {formatDate(app.resumeDutiesDate)}
                        </span>
                        <Badge bg={status.isComplete ? "success" : "warning"}>
                          {status.overallStatus}
                        </Badge>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <ProgressBar 
                          now={status.percentage} 
                          label={`${status.percentage}%`}
                          variant={status.isComplete ? "success" : "primary"}
                          striped
                          animated={!status.isComplete}
                        />
                      </div>
                      
                      {status.steps.map((step, index) => (
                        <div 
                          key={index}
                          className={`status-step ${step.completed ? 'completed' : ''} ${index + 1 > status.currentStep ? 'future' : ''}`}
                        >
                          <div className="step-icon">{step.icon}</div>
                          <div className="step-content">
                            <h5>{step.name}</h5>
                            <p>{step.description}</p>
                            <small className="text-muted">Status: {step.status}</small>
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-top-0">
                      <div className="d-flex justify-content-between">
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          onClick={() => handleViewDetails(app)}
                        >
                          View Details
                        </Button>
                        {status.isComplete ? (
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleDownload(app)}
                          >
                            Download Approved
                          </Button>
                        ) : (
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            disabled
                          >
                            Pending Approval
                          </Button>
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

      {/* Application Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#053e34', color: 'white' }}>
          <Modal.Title>Leave Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApp && (
            <div className="application-details">
              <Row>
                <Col md={6}>
                  <h5>Personal Information</h5>
                  <p><strong>Name:</strong> {selectedApp.name}</p>
                  <p><strong>Designation:</strong> {selectedApp.designation}</p>
                  <p><strong>Sub Designation:</strong> {selectedApp.subDesignation}</p>
                  <p><strong>Ministry:</strong> {selectedApp.ministry}</p>
                  <p><strong>First Appointment:</strong> {formatDate(selectedApp.firstAppointmentDate)}</p>
                </Col>
                <Col md={6}>
                  <h5>Leave Details</h5>
                  <p><strong>Leave Period:</strong> {formatDate(selectedApp.commenceLeaveDate)} to {formatDate(selectedApp.resumeDutiesDate)}</p>
                  <p><strong>Casual Leave:</strong> {selectedApp.leaveDaysC} days</p>
                  <p><strong>Vacation Leave:</strong> {selectedApp.leaveDaysV} days</p>
                  <p><strong>Other Leave:</strong> {selectedApp.leaveDaysO} days</p>
                  <p><strong>Reason:</strong> {selectedApp.reasonForLeave}</p>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={6}>
                  <h5>Applicant Signature</h5>
                  <Image
                    src={selectedApp.applicantSignature ? 
                      `http://localhost:8093/uploads_LeaveApplicant/${selectedApp.applicantSignature}` : 
                      'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                    alt="Applicant Signature"
                    fluid
                    className="signature-image"
                  />
                </Col>
                <Col md={6}>
                  <h5>Acting Officer Signature</h5>
                  <Image
                    src={selectedApp.officerActingSignature ? 
                      `http://localhost:8093/uploads_LeaveApplicant/${selectedApp.officerActingSignature}` : 
                      'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                    alt="Officer Acting Signature"
                    fluid
                    className="signature-image"
                  />
                </Col>
              </Row>
              
              {/* Approval Details */}
              <div className="mt-4">
                <h5>Approval Progress</h5>
                {selectedApp.action1 && (
                  <div className="approval-detail mb-3">
                    <h6>Supervisor Approval</h6>
                    <p><strong>Recommendation:</strong> {selectedApp.action1.recommendation}</p>
                    <p><strong>Officer:</strong> {selectedApp.action1.supervisingOfficerName}</p>
                    <p><strong>Date:</strong> {formatDate(selectedApp.action1.date1)}</p>
                    <Image
                      src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions1/${selectedApp.action1.signature1}`}
                      alt="Supervisor Signature"
                      fluid
                      className="approval-signature"
                    />
                  </div>
                )}
                
                {selectedApp.action2 && (
                  <div className="approval-detail mb-3">
                    <h6>Department Head Approval</h6>
                    <p><strong>Decision:</strong> {selectedApp.action2.allowedByHead}</p>
                    <p><strong>Officer:</strong> {selectedApp.action2.headOfDepartmentName}</p>
                    <p><strong>Date:</strong> {formatDate(selectedApp.action2.date2)}</p>
                    <Image
                      src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions2/${selectedApp.action2.signature2}`}
                      alt="Department Head Signature"
                      fluid
                      className="approval-signature"
                    />
                  </div>
                )}
                
                {selectedApp.action3 && (
                  <div className="approval-detail">
                    <h6>HR Final Approval</h6>
                    <p><strong>Decision:</strong> {selectedApp.action3.finalApproval}</p>
                    <p><strong>Clerk:</strong> {selectedApp.action3.leaveClerkName}</p>
                    <p><strong>Date:</strong> {formatDate(selectedApp.action3.date3)}</p>
                    <Image
                      src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions3/${selectedApp.action3.signature3}`}
                      alt="HR Signature"
                      fluid
                      className="approval-signature"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          {selectedApp && getStatusInfo(selectedApp).isComplete && (
            <Button 
              variant="primary"
              style={{ backgroundColor: '#053e34', borderColor: '#053e34' }}
              onClick={() => handleDownload(selectedApp)}
            >
              Download Approved Application
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}

export default LeaveStatus;