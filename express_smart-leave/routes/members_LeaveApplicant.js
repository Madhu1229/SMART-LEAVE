import express from "express";
import Member_LeaveApplicant from "../models/Member_LeaveApplicant.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { format } from 'date-fns';

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

export default router;
