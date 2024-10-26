import React, { useState } from "react";
import axios from "axios";

function LeaveApplicationsByDate() {
    const [date, setDate] = useState("");
    const [applications, setApplications] = useState([]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const fetchApplicationsByDate = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getByDate`, {
                params: { date },
            });
            setApplications(response.data.applications);
        } catch (error) {
            console.error("Error fetching applications:", error);
            alert("Error fetching applications");
        }
    };

    return (
        <div>
            <h2>View Leave Applications by Date</h2>
            <input type="date" value={date} onChange={handleDateChange} />
            <button onClick={fetchApplicationsByDate}>Fetch Applications</button>

            {applications.length > 0 ? (
                <ul>
                    {applications.map((app) => (
                        <li key={app._id}>
                            <p>Name: {app.name}</p>
                            <p>Designation: {app.designation}</p>
                            {/* Display other relevant application data */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No applications found for the selected date.</p>
            )}
        </div>
    );
}

export default LeaveApplicationsByDate;
