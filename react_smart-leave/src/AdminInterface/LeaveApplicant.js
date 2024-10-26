import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Image } from "react-bootstrap";

function LeaveApplicationsByDate() {
    const [date, setDate] = useState("");
    const [applications, setApplications] = useState([]);
    const [membersData, setMembersData] = useState([]); // State to store members data


    useEffect(() => {
      const fetchMembersData = async () => {
          try {
              const response = await axios.get(`http://localhost:8093/Members/getAll`); // Adjust this endpoint to your needs
              setMembersData(response.data.members); // Assuming the members data is in response.data.members
          } catch (error) {
              console.error("Error fetching members data:", error);
          }
      };

      fetchMembersData();
  }, []); // Empty dependency array means this runs once when the component mounts


    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const fetchApplicationsByDate = async () => {
      try {
          const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/getByDate`, {
              params: { date },
          });
          const leaveApplications = response.data.applications;

          // Match leave applications with members data
          const matchedApplications = leaveApplications.map(app => {
              const member = membersData.find(member => 
                  member.fullName === app.name  && 
                  member.designation === app.designation
               );

              // Check if there is at least one mismatch
              const isValid = member ? 
                  (member.fullName === app.name && 
                   member.designation === app.designation
                ) : false;

              return {
                  ...app,
                  isValid: isValid // true if matched, false if not matched
              };
          });

          setApplications(matchedApplications);
      } catch (error) {
          console.error("Error fetching applications:", error);
          alert("Error fetching applications");
      }
  };


    return (
        <div className="container mt-5">
            <h2 className="mb-4">View Leave Applications by Date</h2>
            
            <Form.Group controlId="date">
                <Form.Label>Select Date:</Form.Label>
                <Form.Control type="date" value={date} onChange={handleDateChange} />
            </Form.Group>
            <Button className="mt-3" variant="primary" onClick={fetchApplicationsByDate}>
                Fetch Applications
            </Button>

            {applications.length > 0 ? (

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
                            <th>Status</th> {/* Column for status */}
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id}>
                                
                                <td>{app.name}</td>
                                <td>{app.designation}</td>
                                <td>{app.subDesignation}</td>
                                <td>{app.ministry}</td>
                                <td>{app.leaveDaysC}</td>
                                <td>{app.leaveDaysV}</td>
                                <td>{app.leaveDaysO}</td>
                                <td>{new Date(app.firstAppointmentDate).toLocaleDateString()}</td>
                                <td>{new Date(app.commenceLeaveDate).toLocaleDateString()}</td>
                                <td>{new Date(app.resumeDutiesDate).toLocaleDateString()}</td>
                                <td>{app.reasonForLeave}</td>
                                
                                <td>
                                  <Image
                                    src={app.applicantSignature ? `http://localhost:8093/uploads_LeaveApplicant/${app.applicantSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                    alt="Applicant Signature"
                                    style={{ width: '100%', height: 'auto', maxWidth: '400px', maxHeight: '400px', borderRadius: '10%' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'; }} // Fallback on error
                                  />

                                  </td>
                                  <td>
                                  <Image
                                    src={app.officerActingSignature ? `http://localhost:8093/uploads_LeaveApplicant/${app.officerActingSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                    alt="officer Acting Signature"
                                    style={{ width: '100%', height: 'auto', maxWidth: '400px', maxHeight: '400px', borderRadius: '10%' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'; }} // Fallback on error
                                  />

                                  </td>
                                  <td>{app.isValid ? 'Approved' : 'Rejected'}</td> {/* Displaying status */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-4">No applications found for the selected date.</p>
            )}
        </div>
    );
}

export default LeaveApplicationsByDate;
