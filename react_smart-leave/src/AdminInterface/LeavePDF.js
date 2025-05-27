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
          axios.get(`http://localhost:8093/Take_Actions1/get/6808e5cedf21f97970724fc1`),
          axios.get(`http://localhost:8093/Take_Actions2/get/6808e62cdf21f97970724fe6`),
          axios.get(`http://localhost:8093/Take_Actions3/get/6808e664df21f97970724ffb`)
        ]);

        setAction1Data(res1.data.success ? res1.data.data : null);
        setAction2Data(res2.data.success ? res2.data.data : null);
        setAction3Data(res3.data.success ? res3.data.data : null);
      } catch (err) {
        console.error("Error fetching approval data:", err);
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
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`leave-application-${id}.pdf`);
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
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
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <Button variant="success" onClick={downloadPDF}>Download PDF</Button>
      </div>

      <Card id="pdf-content" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '2rem', border: '1px solid #ccc' }}>
        <Card.Header style={{ backgroundColor: '#053e34', color: 'white', textAlign: 'center' }}>
          <h2>Leave Application Form</h2>
        </Card.Header>
        <Card.Body>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3>OFFICIAL LEAVE APPLICATION</h3>
            <p style={{ fontSize: '1.25rem', color: 'gray' }}>Ministry of {application.ministry}</p>
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
            <Col md={4} style={{ textAlign: 'center' }}>
              <p><strong>Applicant</strong></p>
              <Image
                src={`http://localhost:8093/uploads_LeaveApplicant/${application.applicantSignature}`}
                alt="Applicant Signature"
                style={{ maxHeight: '80px' }}
              />
              <p>{application.name}</p>
            </Col>

            <Col md={4} style={{ textAlign: 'center' }}>
              <p><strong>Acting Officer</strong></p>
              <Image
                src={`http://localhost:8093/uploads_LeaveApplicant/${application.officerActingSignature}`}
                alt="Acting Officer Signature"
                style={{ maxHeight: '80px' }}
              />
              <p>{application.officerActingName || 'N/A'}</p>
            </Col>
          </Row>

          <h4 className="mt-5">Approval Signatures</h4>
          <Row className="mt-3">
            {[action1Data, action2Data, action3Data].map((action, index) => (
              action && (
                <Col key={index} md={4} style={{ textAlign: 'center', border: '1px solid #ccc', padding: '1rem' }}>
                  <p><strong>{['Supervising Officer', 'Head of Department', 'Leave Clerk'][index]}</strong></p>
                  <Image
                    src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions${index + 1}/${action[`signature${index + 1}`]}`}
                    alt={`${['Supervising Officer', 'Head of Department', 'Leave Clerk'][index]} Signature`}
                    style={{ maxHeight: '80px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-signature.png';
                    }}
                  />
                  <p>{action[[
                    'supervisingOfficerName',
                    'headOfDepartmentName',
                    'leaveClerkName'
                  ][index]]}</p>
                  <p>Status: {action[[
                    'recommendation',
                    'allowedByHead',
                    'finalApproval'
                  ][index]]}</p>
                  <p>{formatDate(action.date)}</p>
                </Col>
              )
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LeavePDFViewer;
