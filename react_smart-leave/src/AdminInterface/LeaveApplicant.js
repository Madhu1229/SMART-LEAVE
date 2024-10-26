import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Container, Form } from 'react-bootstrap';
import axios from 'axios';

export default function ApprovalDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApplications(selectedDate);
  }, [selectedDate]);

  const fetchApplications = async (date) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/date/${date}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id, level) => {
    try {
      const response = await axios.post(`http://localhost:8093/Member_LeaveApplicant/approve`, { id, level });
      // Update the state to reflect approval status
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === id ? { ...app, approvalLevel: response.data.approvalLevel } : app
        )
      );
      alert(`Application approved at Level ${level}`);
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>View Submitted Applications</h2>
      <Form.Group controlId="dateSelector" className="mb-3">
        <Form.Label>Select Date:</Form.Label>
        <Form.Control
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Form.Group>
      {isLoading ? (
        <div>Loading applications...</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Designation</th>
              <th>Submission Date</th>
              <th>Approval Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No applications submitted on this date.</td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.designation}</td>
                  <td>{new Date(app.submissionDate).toLocaleDateString()}</td>
                  <td>
                    {app.approvalLevel === 0 && <Badge bg="secondary">Pending</Badge>}
                    {app.approvalLevel === 1 && <Badge bg="warning">Level 1 Approved</Badge>}
                    {app.approvalLevel === 2 && <Badge bg="info">Level 2 Approved</Badge>}
                    {app.approvalLevel === 3 && <Badge bg="success">Fully Approved</Badge>}
                  </td>
                  <td>
                    {app.approvalLevel < 3 && (
                      <Button
                        variant="primary"
                        onClick={() => handleApprove(app.id, app.approvalLevel + 1)}
                        disabled={app.approvalLevel === 3}
                      >
                        Approve Level {app.approvalLevel + 1}
                      </Button>
                    )}
                    {app.approvalLevel === 3 && <span>Approved by All</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
