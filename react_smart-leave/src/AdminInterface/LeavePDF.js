import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Alert, Button, Card, Row, Col, Image } from 'react-bootstrap';
import { format } from 'date-fns';

function LeavePDFViewer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8093/Member_LeaveApplicant/get/${id}`,
                    {
                        timeout: 10000,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                );
    
                // Check if the response structure is correct
                if (!response.data || typeof response.data.success === 'undefined') {
                    throw new Error('Invalid server response format');
                }
    
                if (!response.data.success) {
                    throw new Error(response.data.message || 'Failed to fetch application');
                }
    
                if (!response.data.data) {
                    throw new Error('Application data not found in response');
                }
    
                setApplication(response.data.data);
            } catch (err) {
                let errorMessage = 'Failed to load application';
                
                if (err.response) {
                    // Server responded with error status
                    errorMessage = err.response.data?.message || 
                                 `Server error: ${err.response.status}`;
                    
                    // Handle specific status codes
                    if (err.response.status === 404) {
                        errorMessage = 'Application not found';
                    } else if (err.response.status === 400) {
                        errorMessage = 'Invalid application ID';
                    }
                } else if (err.request) {
                    // Request was made but no response
                    errorMessage = 'No response from server. Please check your connection.';
                } else {
                    // Other errors
                    errorMessage = err.message || 'An unknown error occurred';
                }
                
                setError(errorMessage);
                console.error('Application fetch error:', {
                    message: errorMessage,
                    details: err.response?.data,
                    status: err.response?.status
                });
            } finally {
                setLoading(false);
            }
        };
    
        fetchApplication();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), 'MM/dd/yyyy');
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading application details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <Alert variant="danger">
                    <Alert.Heading>Error Loading Application</Alert.Heading>
                    <p>{error}</p>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <Button 
                            variant="outline-danger" 
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </div>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <Card className="shadow">
                <Card.Header className="bg-primary text-white">
                    <h2 className="mb-0">Leave Application Form</h2>
                </Card.Header>
                <Card.Body>
                    {/* Header Section */}
                    <div className="text-center mb-4">
                        <h3 className="mb-1">OFFICIAL LEAVE APPLICATION</h3>
                        <p className="h5 text-muted">Ministry of {application.ministry}</p>
                        <hr className="my-3" />
                    </div>

                    {/* Applicant Details */}
                    <div className="mb-4">
                        <h4 className="border-bottom pb-2">Applicant Details</h4>
                        <Row>
                            <Col md={6}>
                                <p><strong>Name:</strong> {application.name}</p>
                                <p><strong>Designation:</strong> {application.designation}</p>
                                <p><strong>Sub Designation:</strong> {application.subDesignation}</p>
                            </Col>
                            <Col md={6}>
                                <p><strong>Ministry:</strong> {application.ministry}</p>
                                <p><strong>First Appointment:</strong> {formatDate(application.firstAppointmentDate)}</p>
                            </Col>
                        </Row>
                    </div>

                    {/* Leave Details */}
                    <div className="mb-4">
                        <h4 className="border-bottom pb-2">Leave Details</h4>
                        <Row>
                            <Col md={4}>
                                <p><strong>Casual Leave:</strong> {application.leaveDaysC} days</p>
                            </Col>
                            <Col md={4}>
                                <p><strong>Vacation Leave:</strong> {application.leaveDaysV} days</p>
                            </Col>
                            <Col md={4}>
                                <p><strong>Other Leave:</strong> {application.leaveDaysO} days</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <p><strong>Commence Date:</strong> {formatDate(application.commenceLeaveDate)}</p>
                                <p><strong>Reason:</strong> {application.reasonForLeave}</p>
                                <p><strong>Contact During Leave:</strong> {application.contactDuringLeave || 'N/A'}</p>
                            </Col>
                            <Col md={6}>
                                <p><strong>Resume Date:</strong> {formatDate(application.resumeDutiesDate)}</p>
                                <p><strong>Total Leave Days:</strong> {application.leaveDaysC + application.leaveDaysV + application.leaveDaysO} days</p>
                                <p><strong>Date of Application:</strong> {formatDate(application.date)}</p>
                            </Col>
                        </Row>
                    </div>

                    {/* Signatures Section */}
                    <div className="mt-5">
                        <h4 className="border-bottom pb-2">Approval Signatures</h4>
                        <Row className="mt-4">
                            {/* Applicant Signature */}
                            <Col md={4} className="text-center">
                                <div className="signature-box p-3 border rounded">
                                    <p className="mb-3"><strong>Applicant Signature</strong></p>
                                    <Image
                                        src={application.applicantSignature ? 
                                            `http://localhost:8093/uploads_LeaveApplicant/${application.applicantSignature}` : 
                                            '/default-signature.png'}
                                        alt="Applicant Signature"
                                        className="img-fluid signature-img mb-2"
                                        style={{ maxHeight: '80px' }}
                                    />
                                    <p className="text-muted small mb-1">{application.name}</p>
                                    <p className="text-muted small">{formatDate(application.date)}</p>
                                </div>
                            </Col>

                            {/* Acting Officer Signature */}
                            <Col md={4} className="text-center">
                                <div className="signature-box p-3 border rounded">
                                    <p className="mb-3"><strong>Acting Officer Signature</strong></p>
                                    <Image
                                        src={application.officerActingSignature ? 
                                            `http://localhost:8093/uploads_LeaveApplicant/${application.officerActingSignature}` : 
                                            '/default-signature.png'}
                                        alt="Officer Signature"
                                        className="img-fluid signature-img mb-2"
                                        style={{ maxHeight: '80px' }}
                                    />
                                    <p className="text-muted small mb-1">{application.officerActingName || 'N/A'}</p>
                                    <p className="text-muted small">{formatDate(application.date)}</p>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Status Section */}
                    <div className="mt-4 p-3 bg-light rounded">
                        <Row>
                            <Col>
                                <h5 className="mb-3">Application Status</h5>
                                <p className={`lead ${application.status === 'Accepted' ? 'text-success' : 'text-danger'}`}>
                                    {application.status || 'Pending'}
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default LeavePDFViewer;