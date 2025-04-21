// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Spinner, Alert, Button, Card, Row, Col, Image } from 'react-bootstrap';
// import { format } from 'date-fns';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function LeavePDFViewer() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [application, setApplication] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [action1Data, setAction1Data] = useState(null);
//     const [action2Data, setAction2Data] = useState(null);
//     const [action3Data, setAction3Data] = useState(null);


//     useEffect(() => {
//         const fetchApplication = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:8093/Member_LeaveApplicant/get/${id}`,
//                     {
//                         timeout: 10000,
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Accept': 'application/json'
//                         }
//                     }
//                 );
    
//                 // Check if the response structure is correct
//                 if (!response.data || typeof response.data.success === 'undefined') {
//                     throw new Error('Invalid server response format');
//                 }
    
//                 if (!response.data.success) {
//                     throw new Error(response.data.message || 'Failed to fetch application');
//                 }
    
//                 if (!response.data.data) {
//                     throw new Error('Application data not found in response');
//                 }
    
//                 setApplication(response.data.data);
//             } catch (err) {
//                 let errorMessage = 'Failed to load application';
                
//                 if (err.response) {
//                     // Server responded with error status
//                     errorMessage = err.response.data?.message || 
//                                  `Server error: ${err.response.status}`;
                    
//                     // Handle specific status codes
//                     if (err.response.status === 404) {
//                         errorMessage = 'Application not found';
//                     } else if (err.response.status === 400) {
//                         errorMessage = 'Invalid application ID';
//                     }
//                 } else if (err.request) {
//                     // Request was made but no response
//                     errorMessage = 'No response from server. Please check your connection.';
//                 } else {
//                     // Other errors
//                     errorMessage = err.message || 'An unknown error occurred';
//                 }
                
//                 setError(errorMessage);
//                 console.error('Application fetch error:', {
//                     message: errorMessage,
//                     details: err.response?.data,
//                     status: err.response?.status
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchApplication();
//     }, [id]);
    

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         return format(new Date(dateString), 'MM/dd/yyyy');
//     };

//     const getFinalStatus = () => {
//         if (!action1Data || !action2Data || !action3Data) return 'Pending';
        
//         const allApproved = [action1Data, action2Data, action3Data].every(action => 
//             action && (action.recommendation === 'Recommended' || 
//                       action.allowedByHead === 'Allowed' || 
//                       action.finalApproval === 'Approved')
//         );
        
//         return allApproved ? 'Approved' : 'Rejected';
//     };

//     if (loading) {
//         return (
//             <div className="text-center my-5">
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//                 <p>Loading application details...</p>
//             </div>
//         );
//     }

//     const downloadPDF = () => {
//         const input = document.getElementById('pdf-content'); // Add this ID to your Card component
      
//         html2canvas(input, {
//           scale: 2, // Increase for better quality
//           logging: false,
//           useCORS: true,
//           allowTaint: true
//         }).then(canvas => {
//           const imgData = canvas.toDataURL('image/png');
//           const pdf = new jsPDF('p', 'mm', 'a4');
//           const imgWidth = 210; // A4 width in mm
//           const imgHeight = canvas.height * imgWidth / canvas.width;
          
//           pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//           pdf.save(`leave-application-${id}.pdf`);
//         });
//       };


//     if (error) {
//         return (
//             <div className="container my-5">
//                 <Alert variant="danger">
//                     <Alert.Heading>Error Loading Application</Alert.Heading>
//                     <p>{error}</p>
//                     <hr />
//                     <div className="d-flex justify-content-between">
//                         <Button 
//                             variant="outline-danger" 
//                             onClick={() => window.location.reload()}
//                         >
//                             Retry
//                         </Button>
//                         <Button 
//                             variant="primary" 
//                             onClick={() => window.history.back()}
//                         >
//                             Go Back
//                         </Button>
//                     </div>
//                 </Alert>
//             </div>
//         );
//     }

//     return (
//         <div className="container my-4">
//             <Card className="shadow">
//                 <Card.Header className="bg-primary text-white">
//                     <h2 className="mb-0">Leave Application Form</h2>
//                 </Card.Header>
//                 <Card.Body>
//                     {/* Header Section */}
//                     <div className="text-center mb-4">
//                         <h3 className="mb-1">OFFICIAL LEAVE APPLICATION</h3>
//                         <p className="h5 text-muted">Ministry of {application.ministry}</p>
//                         <hr className="my-3" />
//                     </div>

//                     {/* Applicant Details */}
//                     <div className="mb-4">
//                         <h4 className="border-bottom pb-2">Applicant Details</h4>
//                         <Row>
//                             <Col md={6}>
//                                 <p><strong>Name:</strong> {application.name}</p>
//                                 <p><strong>Designation:</strong> {application.designation}</p>
//                                 <p><strong>Sub Designation:</strong> {application.subDesignation}</p>
//                             </Col>
//                             <Col md={6}>
//                                 <p><strong>Ministry:</strong> {application.ministry}</p>
//                                 <p><strong>First Appointment:</strong> {formatDate(application.firstAppointmentDate)}</p>
//                             </Col>
//                         </Row>
//                     </div>

//                     {/* Leave Details */}
//                     <div className="mb-4">
//                         <h4 className="border-bottom pb-2">Leave Details</h4>
//                         <Row>
//                             <Col md={4}>
//                                 <p><strong>Casual Leave:</strong> {application.leaveDaysC} days</p>
//                             </Col>
//                             <Col md={4}>
//                                 <p><strong>Vacation Leave:</strong> {application.leaveDaysV} days</p>
//                             </Col>
//                             <Col md={4}>
//                                 <p><strong>Other Leave:</strong> {application.leaveDaysO} days</p>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6}>
//                                 <p><strong>Commence Date:</strong> {formatDate(application.commenceLeaveDate)}</p>
//                                 <p><strong>Reason:</strong> {application.reasonForLeave}</p>
//                                 <p><strong>Contact During Leave:</strong> {application.contactDuringLeave || 'N/A'}</p>
//                             </Col>
//                             <Col md={6}>
//                                 <p><strong>Resume Date:</strong> {formatDate(application.resumeDutiesDate)}</p>
//                                 <p><strong>Total Leave Days:</strong> {application.leaveDaysC + application.leaveDaysV + application.leaveDaysO} days</p>
//                                 <p><strong>Date of Application:</strong> {formatDate(application.date)}</p>
//                             </Col>
//                         </Row>
//                     </div>

//                     {/* Signatures Section */}
//                     <div className="mt-5">
//                         <h4 className="border-bottom pb-2">Approval Signatures</h4>
//                         <Row className="mt-4">
//                             {/* Applicant Signature */}
//                             <Col md={4} className="text-center">
//                                 <div className="signature-box p-3 border rounded">
//                                     <p className="mb-3"><strong>Applicant Signature</strong></p>
//                                     <Image
//                                         src={application.applicantSignature ? 
//                                             `http://localhost:8093/uploads_LeaveApplicant/${application.applicantSignature}` : 
//                                             '/default-signature.png'}
//                                         alt="Applicant Signature"
//                                         className="img-fluid signature-img mb-2"
//                                         style={{ maxHeight: '80px' }}
//                                     />
//                                     <p className="text-muted small mb-1">{application.name}</p>
//                                     <p className="text-muted small">{formatDate(application.date)}</p>
//                                 </div>
//                             </Col>

//                             {/* Acting Officer Signature */}
//                             <Col md={4} className="text-center">
//                                 <div className="signature-box p-3 border rounded">
//                                     <p className="mb-3"><strong>Acting Officer Signature</strong></p>
//                                     <Image
//                                         src={application.officerActingSignature ? 
//                                             `http://localhost:8093/uploads_LeaveApplicant/${application.officerActingSignature}` : 
//                                             '/default-signature.png'}
//                                         alt="Officer Signature"
//                                         className="img-fluid signature-img mb-2"
//                                         style={{ maxHeight: '80px' }}
//                                     />
//                                     <p className="text-muted small mb-1">{application.officerActingName || 'N/A'}</p>
//                                     <p className="text-muted small">{formatDate(application.date)}</p>
//                                 </div>
//                             </Col>
//                         </Row>

//                         {/* Approval Signatures */}
//                         <Row className="mt-4">
//                             {/* Supervising Officer Signature */}
//                             {action1Data && (
//                                 <Col md={4} className="text-center">
//                                     <div className="signature-box p-3 border rounded">
//                                         <p className="mb-3"><strong>Supervising Officer</strong></p>
//                                         <Image
//                                             src={action1Data.signature1 ? 
//                                                 `http://localhost:8093/uploads_TakeActions1/${action1Data.signature1}` : 
//                                                 '/default-signature.png'}
//                                             alt="Supervising Officer Signature"
//                                             className="img-fluid signature-img mb-2"
//                                             style={{ maxHeight: '80px' }}
//                                         />
//                                         <p className="text-muted small mb-1">{action1Data.supervisingOfficerName}</p>
//                                         <p className="text-muted small">Recommendation: {action1Data.recommendation}</p>
//                                         <p className="text-muted small">{formatDate(action1Data.date)}</p>
//                                     </div>
//                                 </Col>
//                             )}

//                             {/* Head of Department Signature */}
//                             {action2Data && (
//                                 <Col md={4} className="text-center">
//                                     <div className="signature-box p-3 border rounded">
//                                         <p className="mb-3"><strong>Head of Department</strong></p>
//                                         <Image
//                                             src={action2Data.signature2 ? 
//                                                 `http://localhost:8093/uploads_TakeActions2/${action2Data.signature2}` : 
//                                                 '/default-signature.png'}
//                                             alt="Head of Department Signature"
//                                             className="img-fluid signature-img mb-2"
//                                             style={{ maxHeight: '80px' }}
//                                         />
//                                         <p className="text-muted small mb-1">{action2Data.headOfDepartmentName}</p>
//                                         <p className="text-muted small">Decision: {action2Data.allowedByHead}</p>
//                                         <p className="text-muted small">{formatDate(action2Data.date)}</p>
//                                     </div>
//                                 </Col>
//                             )}

//                             {/* Leave Clerk Signature */}
//                             {action3Data && (
//                                 <Col md={4} className="text-center">
//                                     <div className="signature-box p-3 border rounded">
//                                         <p className="mb-3"><strong>Leave Clerk</strong></p>
//                                         <Image
//                                             src={action3Data.signature3 ? 
//                                                 `http://localhost:8093/uploads_TakeActions3/${action3Data.signature3}` : 
//                                                 '/default-signature.png'}
//                                             alt="Leave Clerk Signature"
//                                             className="img-fluid signature-img mb-2"
//                                             style={{ maxHeight: '80px' }}
//                                         />
//                                         <p className="text-muted small mb-1">{action3Data.leaveClerkName}</p>
//                                         <p className="text-muted small">Final Approval: {action3Data.finalApproval}</p>
//                                         <p className="text-muted small">{formatDate(action3Data.date)}</p>
//                                     </div>
//                                 </Col>
//                             )}
//                         </Row>
//                     </div>

//                     {/* Status Section */}
//                     <div className="mt-4 p-3 bg-light rounded">
//                         <Row>
//                             <Col>
//                                 <h5 className="mb-3">Application Status</h5>
//                                 <p className={`lead ${getFinalStatus() === 'Approved' ? 'text-success' : 'text-danger'}`}>
//                                     {getFinalStatus()}
//                                 </p>
//                                 {(!action1Data || !action2Data || !action3Data) && (
//                                     <p className="text-warning">
//                                         {!action1Data && "Pending Supervising Officer Approval"}
//                                         {action1Data && !action2Data && "Pending Head of Department Approval"}
//                                         {action1Data && action2Data && !action3Data && "Pending Leave Clerk Approval"}
//                                     </p>
//                                 )}
//                             </Col>
//                         </Row>
//                     </div>

//                     <div className="container my-4">
//     <div className="d-flex justify-content-end mb-3">
//       <Button variant="primary" onClick={downloadPDF}>
//         Download as PDF
//       </Button>
//     </div>
    
//     <Card id="pdf-content" className="shadow"> {/* Add ID here */}
//       {/* Rest of your existing Card content */}
//     </Card>
    
//   </div>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// }

// export default LeavePDFViewer;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Alert, Button, Card, Row, Col, Image, Form } from 'react-bootstrap';
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
          axios.get(`http://localhost:8093/TakeAction1/get-by-leave-id/${id}`),
          axios.get(`http://localhost:8093/TakeAction2/get-by-leave-id/${id}`),
          axios.get(`http://localhost:8093/TakeAction3/get-by-leave-id/${id}`)
        ]);

        if (res1.data.success) setAction1Data(res1.data.data);
        if (res2.data.success) setAction2Data(res2.data.data);
        if (res3.data.success) setAction3Data(res3.data.data);
      } catch (err) {
        console.warn('Error fetching approval data:', err);
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
        <Card.Header className="bg-primary text-white">
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


          <h4 className="mt-5">Approval Signatures</h4>
          <Row className="mt-3">
          <Col md={4} className="text-center">
            <p><strong>Supervising Officer</strong></p>
            <Image
                src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions1/${application.signature1}`}
                alt="Supervising Officer Signature"
                style={{ maxHeight: '80px' }}
            />
            <p>{application.supervisingOfficerName || 'N/A'}</p>
          </Col>


          <Col md={4} className="text-center">
            <p><strong>Supervising Officer</strong></p>
            <Image
                src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions2/${application.headOfDepartmentSignature}`}
                alt="Supervising Officer Signature"
                style={{ maxHeight: '80px' }}
            />
            <p>{application.supervisingOfficerName || 'N/A'}</p>
          </Col>

            {action3Data && (
              <Col md={4} className="text-center">
                <p><strong>Secretary/Chief Secretary</strong></p>
                <Image
                  src={`http://localhost:8093/uploads_TakeActions/uploads_TakeActions3/${action3Data.signature3}`}
                  alt="Signature"
                  style={{ maxHeight: '80px' }}
                />
                <p>{action3Data.secretaryName}</p>
                <p>Final Approval: {action3Data.finalApproval}</p>
              </Col>
            )}
          </Row>

          
        </Card.Body>
      </Card>
    </div>
  );
}

export default LeavePDFViewer;
