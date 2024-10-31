import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Image, Spinner } from "react-bootstrap";

function LeaveApplicationsByDate() {
    const [date, setDate] = useState("");
    const [leaveStatus, setLeaveStatus] = useState("All");  // Default to All
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [applications, setApplications] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMembersData = async () => {
            try {
                const response = await axios.get(`http://localhost:8093/Members/getAll`);
                setMembersData(response.data.members);
            } catch (error) {
                console.error("Error fetching members data:", error);
            }
        };
        fetchMembersData();
    }, []);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setLeaveStatus(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update search query
    };

    const fetchApplicationsByDate = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8093/Member_LeaveApplicant/getByDate`, { params: { date } });
            const leaveApplications = response.data.applications;

            // Map applications to include status based on isValid
            const matchedApplications = leaveApplications.map(app => {
                const isValid = !!membersData.find(member => member.fullName === app.name && member.designation === app.designation);
                return { 
                    ...app, 
                    status: app.isValid ? "Approved" : "Rejected"  // Assigning status based on isValid
                    
                };
            });

            setApplications(matchedApplications);
        } catch (error) {
            console.error("Error fetching applications:", error);
            alert("Error fetching applications");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    // Filter applications based on selected leaveStatus and search query
    const filteredApplications = applications.filter(app => {
        const matchesStatus = leaveStatus === "All" || app.status === leaveStatus;
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              app.designation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="container mt-5">
            <h2 className="mb-4">View Leave Applications by Date</h2>
            <Form.Group controlId="date">
                <Form.Label>Select Date:</Form.Label>
                <Form.Control type="date" value={date} onChange={handleDateChange} />
            </Form.Group>

            <Form.Group controlId="leaveStatus" className="mt-3">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" value={leaveStatus} onChange={handleStatusChange}>
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
                    onChange={handleSearchChange} 
                />
            </Form.Group>

            <Button className="mt-3" variant="primary" onClick={fetchApplicationsByDate} disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Fetch Applications"}
            </Button>

            {filteredApplications.length > 0 ? (
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
                            <th>Status</th>
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
                                        style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'; }}
                                    />
                                </td>
                                <td>
                                    <Image
                                        src={app.officerActingSignature ? `http://localhost:8093/uploads_LeaveApplicant/${app.officerActingSignature}` : 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'}
                                        alt="Officer Acting Signature"
                                        style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '10%' }}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:8093/uploads_LeaveApplicant/default.jpg'; }}
                                    />
                                </td>
                                <td>{app.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-4">No applications found for the selected date and status.</p>
            )}
        </div>
    );
}

export default LeaveApplicationsByDate;
