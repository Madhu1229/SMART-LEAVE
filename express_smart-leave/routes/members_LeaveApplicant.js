import express from "express";
import Member_LeaveApplicant from "../models/Member_LeaveApplicant.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { format } from 'date-fns';
import mongoose from "mongoose";



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
// // API Endpoint to get leave applications by submission date and match with members
// router.get("/getByDate", async (req, res) => {
//     console.log("GET request received at /getByDate");
//     try {
//         const { date } = req.query; // Expecting a query parameter named 'date'
//         if (!date) {
//             return res.status(400).json({ status: "Date parameter is required" });
//         }

//         // Parse the date and define start and end of the day
//         const selectedDate = new Date(date + 'Z');
//         const startOfDay = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
//         const endOfDay = new Date(selectedDate.setUTCHours(23, 59, 59, 999));

//         // Fetch all leave applications within the specified date range
//         const applications = await Member_LeaveApplicant.find({
//             date: {
//                 $gte: startOfDay,
//                 $lt: endOfDay,
//             },
//         });

//         // Check if applications were found
//         if (applications.length === 0) {
//             return res.status(200).send({ status: "No leave applications found for the specified date", applications });
//         }

//         // Fetch all members for matching
//         const members = await Member.find();

//         // Create a map of members for quick lookup
//         const memberMap = new Map();
//         members.forEach(member => {
//             memberMap.set(`${member.fullName}|${member.designation}`, member);
//         });

//         // Match applications with members and set status
//         const matchedApplications = applications.map(app => {
//             const key = `${app.name}|${app.designation}`;
//             const member = memberMap.get(key); // O(1) lookup time

//             return {
//                 ...app.toObject(),
//                 isValid: !!member, // true if matched, false if not matched
//                 status: member ? 'Accepted' : 'Rejected', // Set status based on existence of matching member
//                 matchedMember: member || null // Include matched member details if needed
//             };
//         });

//         // Return the matched applications
//         res.status(200).send({ status: "Leave applications fetched for the date", applications: matchedApplications });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ status: "Error fetching applications", error: err.message });
//     }
// });


//above is ancient....................

//now is new.......


router.get("/getByDate", async (req, res) => {
    console.log("GET request received at /getByDate");
    try {
        const { date } = req.query; // Expecting a query parameter named 'date'
        if (!date) {
            return res.status(400).json({ status: "Date parameter is required" });
        }

        // Parse the date and define start and end of the day
        const selectedDate = new Date(date + 'T00:00:00Z'); // Add timezone for consistency
        const startOfDay = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(selectedDate.setUTCHours(23, 59, 59, 999));

        // Fetch all leave applications within the specified date range
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

        // Fetch all members for matching
        const members = await Member.find();

        // Create a map of members for quick lookup
        const memberMap = new Map();
        members.forEach(member => {
            const normalizedKey = `${member.fullName.trim().toLowerCase()}|${member.designation.trim().toLowerCase()}`;
            memberMap.set(normalizedKey, member);
        });

        // Match applications with members and set status
        const matchedApplications = applications.map(app => {
            const normalizedKey = `${app.name.trim().toLowerCase()}|${app.designation.trim().toLowerCase()}`;
            const member = memberMap.get(normalizedKey);

            return {
                ...app.toObject(),
                isValid: !!member,
                status: member ? 'Accepted' : 'Rejected',
                matchedMember: member || null,
            };
        });

        // Return the matched applications
        res.status(200).send({ status: "Leave applications fetched for the date", applications: matchedApplications });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching applications", error: err.message });
    }
});
// // Route to get matching records
// router.get('/matchLeaveApplicants', async (req, res) => {
//     try {
//         // Fetch all leave applications and members
//         const leaveApplications = await Member_LeaveApplicant.find();
//         const members = await Member.find();

//         // Create a map of members for quick lookup
//         const memberMap = new Map();
//         members.forEach(member => {
//             memberMap.set(`${member.fullName}|${member.designation}`, member);
//         });

//         // Find matches based on name and designation
//         const matchedRecords = leaveApplications.map(app => {
//             const key = `${app.name}|${app.designation}`;
//             const member = memberMap.get(key); // O(1) lookup time
            
//             return {
//                 ...app.toObject(),
//                 isValid: !!member, // true if matched, false if not matched
//                 status: member ? 'Accepted' : 'Rejected', // Set status based on existence of matching member
//                 matchedMember: member || null // Include matched member details if needed
//             };
//         });

//         res.json({ matchedRecords });
//     } catch (error) {
//         console.error("Error fetching matching records:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


// Get leave applications for the current user
router.get("/auth/validate", async (req, res) => {
    try {
      // You'll need to get the user ID from the token
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      const decoded = jwt.verify(token, "smart-leave-2025");
      const user = await Member.findOne({ _id: decoded.id });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Find applications where name matches user's fullName
      const applications = await Member_LeaveApplicant.find({ 
        name: user.fullName 
      });
  
      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });


//   const { ObjectId } = require('mongodb');
// db.collection('leaveApplicants').find({ _id: ObjectId(id) }).toArray((err, result) => {
//     if (err) throw err;
//     res.json(result);
// });


  // Add this route to get a single leave application by ID

 // Get leave application by ID
router.get("/get/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid ID format",
                error: "The provided ID is not a valid MongoDB ObjectId" 
            });
        }

        // ✅ Find leave application by ID
        const application = await Member_LeaveApplicant.findById(id).lean();

        if (!application) {
            return res.status(404).json({ 
                success: false,
                message: "Leave application not found",
                error: "No application found with the provided ID"
            });
        }

        // ✅ Format date fields to ISO string
        const formattedApplication = {
            ...application,
            date: application.date ? new Date(application.date).toISOString() : null,
            firstAppointmentDate: application.firstAppointmentDate ? new Date(application.firstAppointmentDate).toISOString() : null,
            commenceLeaveDate: application.commenceLeaveDate ? new Date(application.commenceLeaveDate).toISOString() : null,
            resumeDutiesDate: application.resumeDutiesDate ? new Date(application.resumeDutiesDate).toISOString() : null
        };

        res.status(200).json({ 
            success: true,
            data: formattedApplication
        });
    } catch (err) {
        console.error('Error in /get/:id:', err);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

// Optional: Global error handler (keep this at the end of all routes)
router.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

export default router;