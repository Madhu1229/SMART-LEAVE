




import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../Pages/Footer';

const Dashboard = () => {
  const [leaveBalance, setLeaveBalance] = useState({});
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [alert, setAlert] = useState("");

  useEffect(() => {
    // Fetch the data for the dashboard (this could come from your backend)
    const fetchData = async () => {
      try {
        // Assuming an API that gives the leave balance, upcoming leaves, and leave history
        const leaveBalanceRes = await axios.get('/api/leaveBalance'); 
        const upcomingLeavesRes = await axios.get('/api/upcomingLeaves');
        const leaveHistoryRes = await axios.get('/api/leaveHistory');
        const userProfileRes = await axios.get('/api/userProfile');
        
        setLeaveBalance(leaveBalanceRes.data);
        setUpcomingLeaves(upcomingLeavesRes.data);
        setLeaveHistory(leaveHistoryRes.data);
        setUserProfile(userProfileRes.data);
      } catch (err) {
        setAlert("Error fetching data for the dashboard.");
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1>Welcome to Your Dashboard</h1>
      {alert && <Alert variant="danger">{alert}</Alert>}

      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
              <img src={userProfile.photoUrl} alt="Profile" className="img-fluid rounded-circle" />
              <h5>{userProfile.name}</h5>
              <p>{userProfile.designation}</p>
              <p>{userProfile.firstAppointmentDate}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Row>
            <Col sm={6}>
              <Card>
                <Card.Header>Leave Balance</Card.Header>
                <Card.Body>
                  <ul>
                    <li>Casual Leave: {leaveBalance.casual}</li>
                    <li>Vacation Leave: {leaveBalance.vacation}</li>
                    <li>Other Leave: {leaveBalance.other}</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card>
                <Card.Header>Upcoming Leave</Card.Header>
                <Card.Body>
                  {upcomingLeaves.length > 0 ? (
                    <ul>
                      {upcomingLeaves.map((leave, index) => (
                        <li key={index}>{leave.reason} from {leave.startDate} to {leave.endDate}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No upcoming leaves.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card>
            <Card.Header>Leave History</Card.Header>
            <Card.Body>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.length > 0 ? (
                    leaveHistory.map((history, index) => (
                      <tr key={index}>
                        <td>{history.leaveType}</td>
                        <td>{history.startDate}</td>
                        <td>{history.endDate}</td>
                        <td>{history.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No leave history available.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/*............................ For Footer................................................ */}
    <Footer/>
    </Container>
  );
};

export default Dashboard;
