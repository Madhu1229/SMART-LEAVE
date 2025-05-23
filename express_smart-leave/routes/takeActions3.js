import express from "express";
import Take_Actions3 from "../models/Take_Actions3.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";

//matching 2 data collections...
import Member from "../models/Member.js";

// // Define __dirname for ES modules
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);


// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer for file uploads, saving files to 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads_TakeActions/uploads_TakeActions3'); // Specify the folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({
 storage: storage,
 limits: { fileSize: 10 * 1024 * 1024 }, // Optional: Limit file size (e.g., 10MB)
});


const router = express.Router();

// Insert data into the database
router.post("/add", upload.fields([
    
    { name: 'signature3', maxCount: 1 }
    
]), async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log to see if the form data is received
        console.log('Request files:', req.files); // Log to see if the files are received

        // Add the file upload check here
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        // Extract other form data from req.body
        const {
            
            finalApproval,
            leaveClerkName,
            role,
            date3
        } = req.body;

        // Extract file metadata from req.files
        const { signature1, signature2, signature3} = req.files;

        // Create a new member with extracted data
        const newTake_Actions3 = new Take_Actions3({
        
            finalApproval,
            leaveClerkName,
            role,
            date3,
            signature3: signature3 ? signature3[0].originalname : ""   // File name for otherDocument2
        
        
        
        
        });

        // Save new member to the database
        await newTake_Actions3.save();
        res.json("New Take Actions Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Read all data
 router.get("/", async (req, res) => {
     try {
         const takeActions3 = await Take_Actions3.find();
            res.status(200).json(takeActions3);
     } catch (err) {
        console.log(err);
         res.status(500).json({ error: err.message });
     }
 });

// // Update data
// router.put("/update/:memberID", async (req, res) => {
//     try {
//         console.log('Update request received for memberID:', req.params.memberID);
//         const memberID = req.params.memberID;
//         const {
//             photo,
//             fullName,
//             address,
//             gender,
//             birthday,
//             age,
//             email,
//             mobile,
//             telephone,
//             maritalStatus,
//             educationLevel,
//             serviceNo,
//             nic,
//             bloodGroup,
//             designation,
//             subDesignation,
//             ministry,
//             joiningDate,
//             leaveTaken,
//             leaveRemaining,
//             role,
//             birthCertificate,
//             otherDocument1,
//             otherDocument2,
//         } = req.body;

//         if (!address) {
//             return res.status(400).json({ error: "Address is required" });
//         }
//         const { street, city, state, zipCode } = address;

//         const updateMember = {
//             photo,
//             fullName,
//             address: { street, city, state, zipCode },
//             gender,
//             birthday: new Date(birthday),
//             age: Number(age),
//             email,
//             mobile,
//             telephone,
//             maritalStatus,
//             educationLevel,
//             serviceNo,
//             nic,
//             bloodGroup,
//             memberID,
//             designation,
//             subDesignation,
//             ministry,
//             joiningDate: new Date(joiningDate),
//             leaveTaken: Number(leaveTaken),
//             leaveRemaining: Number(leaveRemaining),
//             role,
//             birthCertificate,
//             otherDocument1,
//             otherDocument2,
//         };

//         const updatedMember = await Member.findOneAndUpdate({ memberID }, updateMember, { new: true });
//         if (!updatedMember) {
//             return res.status(404).send({ status: "Member not found" });
//         }
//         res.status(200).send({ status: "Member updated", member: updatedMember });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ status: "Error updating member", error: err.message });
//     }
// });

// // Delete data
// router.delete("/delete/:memberID", async (req, res) => {
//     try {
//         const memberID = req.params.memberID;
//         const deletedMember = await Member.findOneAndDelete({ memberID });
//         if (!deletedMember) {
//             return res.status(404).send({ status: "Member not found" });
//         }
//         res.status(200).send({ status: "Member deleted" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ status: "Error deleting member", error: err.message });
//     }
// });

// // Get single member data
// router.get("/get/:memberID", async (req, res) => {
//     try {
//         const memberID = req.params.memberID;
//         const member = await Member.findOne({ memberID });
//         if (!member) {
//             return res.status(404).json({ status: "Member not found" });
//         }
//         res.status(200).send({ status: "Member fetched", member });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ status: "Error fetching member", error: err.message });
//     }
// });

// Serve files from the 'uploads' folder
router.get('/uploads_TakeActions/uploads_TakeActions3:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads_TakeActions/uploads_TakeActions3', req.params.filename); // Adjust the path if necessary

    // Log the file path for debugging
    console.log('Requested file path:', filePath);

    // Send the file for download
    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('File not found.');
        }
    });
});


// API Endpoint to get leave applications by submission date and match with members
router.get("/getByDate", async (req, res) => {
    console.log("GET request received at /getByDate");
    try {
        const { date } = req.query; // Expecting a query parameter named 'date'
        if (!date) {
            return res.status(400).json({ status: "Date parameter is required" });
        }

        // Parse the date and define start and end of the day
        const selectedDate = new Date(date + 'Z');
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
            memberMap.set(`${member.fullName}|${member.role}`, member);
        });

        // Match applications with members and set status(new variables check)
        const matchedApplications = applications.map(app => {
            const key = `${app.leaveClerkName}|${app.role}`;
            const member = memberMap.get(key); // O(1) lookup time

            // Convert Mongoose document to plain object
            let appData = app.toObject();

            // Remove `signature1` field
            delete appData.signature3;

            return {
                ...appData,
                matchedMember: member || null // Include matched member details if needed
            };
        });

        // Return the matched applications
        res.status(200).send({ status: "Successfully matched the details!", applications: matchedApplications });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching applications", error: err.message });
    }
});


// router.get('/Take_Actions3/get-by-leave-id/:id', controller.getAction3ByLeaveId);
router.get("/get/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid ID format",
                error: "The provided leave application ID is not a valid MongoDB ObjectId" 
            });
        }

        // ✅ Find action by leave application ID
        const action = await Take_Actions3.findById(id).lean();

        if (!action) {
            return res.status(404).json({ 
                success: false,
                message: "Action record not found",
                error: "No action found for the provided leave application ID",
                data: null // Explicitly set null for clarity
            });
        }

        // ✅ Format date fields to ISO string
        const formattedAction = {
            ...action,
            date3: action.date3 ? new Date(action.date3).toISOString() : null,
            // Add other date fields if they exist in your model
            createdAt: action.createdAt ? new Date(action.createdAt).toISOString() : null,
            updatedAt: action.updatedAt ? new Date(action.updatedAt).toISOString() : null
        };

        res.status(200).json({ 
            success: true,
            message: "Action retrieved successfully",
            data: formattedAction
        });
    } catch (err) {
        console.error('Error in /get-by-leave-id/:id:', err);
        res.status(500).json({ 
            success: false,
            message: "Internal server error while fetching action",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

export default router;
