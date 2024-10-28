import express from "express";
import Member_LeaveApplicant from "../models/Member_LeaveApplicant.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { format } from 'date-fns';


//matching 2 data collections...
import Member from "../models/Member.js";



const router = express.Router();

// Ensure the uploads folder exists
const uploadFolder = 'uploads_LeaveApplicant';
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Define storage for file uploads
const storage_LeaveApplicant = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const fileName = path.parse(file.originalname).name;
        const fileExt = path.extname(file.originalname);
        const currentDate = format(new Date(), 'yyyy-MM-dd');

        // Synchronous file existence check and unique filename generator
        let uniqueFileName = `${fileName}(${currentDate})${fileExt}`;
        let filePath = path.join(uploadFolder, uniqueFileName);
        let count = 1;

        // Check if file exists and append a count to make it unique
        while (fs.existsSync(filePath)) {
            uniqueFileName = `${fileName}(${currentDate})(${count})${fileExt}`;
            filePath = path.join(uploadFolder, uniqueFileName);
            count++;
        }

        cb(null, uniqueFileName);
    }
});

const upload_LeaveApplicant = multer({
    storage: storage_LeaveApplicant,
    // limits: { fileSize: 10 * 1024 * 1024 }, // Optional: limit file size
});

// Route to handle form submission with file upload
router.post("/add", upload_LeaveApplicant.fields([
    { name: 'applicantSignature', maxCount: 1 },
    { name: 'officerActingSignature', maxCount: 1 },
]), async (req, res) => {
    try {
        console.log(req.files);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        // Extract form data from req.body
        const {
            name,
            designation,
            subDesignation,
            ministry,
            leaveDaysC,
            leaveDaysV,
            leaveDaysO,
            leaveTakenC,
            leaveTakenV,
            leaveTakenO,
            date,
            firstAppointmentDate,
            commenceLeaveDate,
            resumeDutiesDate,
            reasonForLeave,
            officerActingName,
        } = req.body;

        // Extract file metadata from req.files
        const { applicantSignature, officerActingSignature } = req.files;

        // Create a new record with the extracted data
        const newMember_LeaveApplicant = new Member_LeaveApplicant({
            name,
            designation,
            subDesignation,
            ministry,
            leaveDaysC: Number(leaveDaysC),
            leaveDaysV: Number(leaveDaysV),
            leaveDaysO: Number(leaveDaysO),
            leaveTakenC: Number(leaveTakenC),
            leaveTakenV: Number(leaveTakenV),
            leaveTakenO: Number(leaveTakenO),
            date: new Date(date),
            firstAppointmentDate: new Date(firstAppointmentDate),
            commenceLeaveDate: new Date(commenceLeaveDate),
            resumeDutiesDate: new Date(resumeDutiesDate),
            reasonForLeave,
            applicantSignature: applicantSignature ? applicantSignature[0].filename : "",
            officerActingName,
            officerActingSignature: officerActingSignature ? officerActingSignature[0].filename : "",
        });

        // Save to the database
        await newMember_LeaveApplicant.save();
        res.json("Leave Apply Submitted");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});



// Read all data
router.get("/", async (req, res) => {
    try {
        const members_LeaveApplicant = await Member_LeaveApplicant.find();
        res.status(200).json(members_LeaveApplicant);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});
// API Endpoint to get leave applications by submission date
router.get("/getByDate", async (req, res) => {
    console.log("GET request received at /getByDate");
    try {
        const { date } = req.query; // Expecting a query parameter named 'date'
        if (!date) {
            return res.status(400).json({ status: "Date parameter is required" });
        }
        const selectedDate = new Date(date+ 'Z');
            const startOfDay = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
            const endOfDay = new Date(selectedDate.setUTCHours(23, 59, 59, 999));
        const applications = await Member_LeaveApplicant.find({
            date: {
                 $gte: startOfDay,
                 $lt: endOfDay,
            },
        });
     // Check if applications were found
     if (applications.length === 0) {
        return res.status(200).send({ status: "No leave applications found for the specified date", applications });
    }
    res.status(200).send({ status: "Leave applications fetched for the date", applications });
} catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error fetching applications", error: err.message });
}
});

// Route to get matching records
router.get('/matchLeaveApplicants', async (req, res) => {
    try {
        // Fetch all leave applications and members
        const leaveApplications = await Member_LeaveApplicant.find();
        const members = await Member.find();

        // Create a map of members for quick lookup
        const memberMap = new Map();
        members.forEach(member => {
            memberMap.set(`${member.fullName}|${member.designation}`, member);
        });

        // Find matches based on name and designation
        const matchedRecords = leaveApplications.map(app => {
            const key = `${app.name}|${app.designation}`;
            const member = memberMap.get(key); // O(1) lookup time
            return {
                ...app.toObject(),
                isValid: !!member, // true if matched, false if not matched
                matchedMember: member || null // Include matched member details if needed
            };
        });

        

        res.json({ matchedRecords });
    } catch (error) {
        console.error("Error fetching matching records:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});





export default router;