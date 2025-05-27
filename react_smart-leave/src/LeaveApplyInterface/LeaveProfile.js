import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Alert, Button, Card, Row, Col, Image } from 'react-bootstrap';
import { format } from 'date-fns';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function LeavePDFViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [action1Data, setAction1Data] = useState(null);
  const [action2Data, setAction2Data] = useState(null);
  const [action3Data, setAction3Data] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8093/Member_LeaveApplicant/get/${id}`
        );

        if (response.data.success && response.data.data) {
          setApplication(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch application');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    

    const fetchActions = async () => {
      try {


        const [res1, res2, res3] = await Promise.all([
          axios.get(`http://localhost:8093/Take_Actions1/get/67a43aa1bd93774ba82b9961`),
          axios.get(`http://localhost:8093/Take_Actions2/get/67a35d383b86074ca05e5779`),
          axios.get(`http://localhost:8093/Take_Actions3/get/680802665f736b08ab6c5fbd`)
        ]);
        // const r1 = await fetch(`http://localhost:8093/Take_Actions1/get/${id}`);
        // const r2 = await fetch(`http://localhost:8093/Take_Actions2/get/${id}`);
        // const r3 = await fetch(`http://localhost:8093/Take_Actions3/get/${id}`);

        // res1 = await r1.json();
        // res2 = await r2.json();
        // res3 = await r3.json();
        
        // console.log("==============");
        

        setAction1Data(res1.data.success ? res1.data.data : null);
        setAction2Data(res2.data.success ? res2.data.data : null);
        setAction3Data(res3.data.success ? res3.data.data : null);

      } catch (err) {
        console.error("Error fetching approval data:", err);
        setAction1Data(null);
        setAction2Data(null);
        setAction3Data(null);
      }
    };

    fetchApplication();
    fetchActions();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'yyyy-MM-dd');
  };

  const downloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input, {
      scale: 2,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`leave-application-${id}.pdf`);
    });
  };

  console.log("--------",action1Data);
  
  
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading application details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Alert>
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={downloadPDF}>
          Download PDF
        </Button>
      </div>

      <Card id="pdf-content" className="shadow">
      <Card.Header style={{ backgroundColor: '#053e34', color: 'white' }}>

          <h2 className="mb-0">Leave Application Form</h2>
        </Card.Header>
        <Card.Body>
          <div className="text-center mb-4">
            <h3 className="mb-1">OFFICIAL LEAVE APPLICATION</h3>
            <p className="h5 text-muted">Ministry of {application.ministry}</p>
            <hr />
          </div>

          <h4>Applicant Details</h4>
          <Row>
            <Col md={6}>
            <p><strong>Leave Apply ID:</strong> {application._id}</p>
              <p><strong>Name:</strong> {application.name}</p>
              <p><strong>Designation:</strong> {application.designation}</p>
              <p><strong>Sub Designation:</strong> {application.subDesignation}</p>
            </Col>
            <Col md={6}>
              <p><strong>First Appointment:</strong> {formatDate(application.firstAppointmentDate)}</p>
              <p><strong>Application Date:</strong> {formatDate(application.date)}</p>
            </Col>
          </Row>

          <h4 className="mt-4">Leave Details</h4>
          <Row>
            <Col md={4}><p><strong>Casual Leave:</strong> {application.leaveDaysC} days</p></Col>
            <Col md={4}><p><strong>Vacation Leave:</strong> {application.leaveDaysV} days</p></Col>
            <Col md={4}><p><strong>Other Leave:</strong> {application.leaveDaysO} days</p></Col>
          </Row>
          <Row>
            <Col md={6}>
              <p><strong>Commence Date:</strong> {formatDate(application.commenceLeaveDate)}</p>
              <p><strong>Reason:</strong> {application.reasonForLeave}</p>
            </Col>
            <Col md={6}>
              <p><strong>Resume Date:</strong> {formatDate(application.resumeDutiesDate)}</p>
              <p><strong>Contact:</strong> {application.contactDuringLeave || 'N/A'}</p>
            </Col>
          </Row>

          <h4 className="mt-5">Signatures</h4>
          <Row className="mt-3">
            <Col md={4} className="text-center">
              <p><strong>Applicant</strong></p>
              <Image
                src={`http://localhost:8093/uploads_LeaveApplicant/${application.applicantSignature}`}
                alt="Applicant Signature"
                style={{ maxHeight: '80px' }}
              />
              <p>{application.name}</p>
            </Col>

            <Col md={4} className="text-center">
              <p><strong>Acting Officer</strong></p>
              <Image
                src={`http://localhost:8093/uploads_LeaveApplicant/${application.officerActingSignature}`}
                alt="Acting Officer Signature"
                style={{ maxHeight: '80px' }}
              />
              <p>{application.officerActingName || 'N/A'}</p>
            </Col>
          </Row>

          {/* Approval Signatures */}
          <h4 className="mt-5">Approval Signatures</h4>
          <Row className="mt-3">
            {action1Data && (
              <Col md={4} className="text-center border p-3">
                <p><strong>Supervising Officer</strong></p>
                <Image
                  src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions1/${action1Data.signature1}`}
                  alt="Supervising Officer Signature"
                  style={{ maxHeight: '80px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-signature.png';
                  }}
                />
                <p>{action1Data.supervisingOfficerName}</p>
                <p>Status: {action1Data.recommendation}</p>
                <p>{formatDate(action1Data.date)}</p>
              </Col>
            )}

            {action2Data && (
              <Col md={4} className="text-center border p-3">
                <p><strong>Head of Department</strong></p>
                <Image
                  src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions2/${action2Data.signature2}`}
                  alt="Head of Department Signature"
                  style={{ maxHeight: '80px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-signature.png';
                  }}
                />
                <p>{action2Data.headOfDepartmentName}</p>
                <p>Status: {action2Data.allowedByHead}</p>
                <p>{formatDate(action2Data.date)}</p>
              </Col>
            )}

            {action3Data && (
              <Col md={4} className="text-center border p-3">
                <p><strong>Leave Clerk</strong></p>
                <Image
                  src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions3/${action3Data.signature3}`}
                  alt="Leave Clerk Signature"
                  style={{ maxHeight: '80px' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-signature.png';
                  }}
                />
                <p>{action3Data.leaveClerkName}</p>
                <p>Status: {action3Data.finalApproval}</p>
                <p>{formatDate(action3Data.date)}</p>
              </Col>
            )}
          </Row>

          {/* Success Message */}
          <div className="text-center mt-5">
            <h4>Leave Application Success!!!</h4>
            
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LeavePDFViewer;
