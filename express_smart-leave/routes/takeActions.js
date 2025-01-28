// import express from 'express';
// import Take_Actions from '../models/Take_Actions.js';
// import multer from 'multer';
// import fs from 'fs';
// import { body, validationResult } from 'express-validator';


// const router = express.Router();

// // Ensure upload directory exists
// const uploadDirectory = './uploads/signatures';
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// // Set up Multer storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDirectory);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// });

// // POST route to submit action with file upload and validation
// router.post(
//     '/submit-action',
//     upload.fields([
//         { name: 'signature1', maxCount: 1 },
//         { name: 'signature2', maxCount: 1 },
//         { name: 'signature3', maxCount: 1 }
//     ]),
//     [
//         body('actionStep').notEmpty().withMessage('Action Step is required'),
//         body('recommendation').isIn(['Recommended', 'Not Recommended']).withMessage('Invalid recommendation value'),
//         body('allowedByHead').isIn(['Allowed', 'Not Allowed']).withMessage('Invalid allowedByHead value'),
//         body('finalApproval').isIn(['Approved', 'Not Approved']).withMessage('Invalid finalApproval value'),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             const { actionStep, recommendation, allowedByHead, finalApproval } = req.body;

//             const signature1 = req.files?.signature1?.[0]?.path || null;
//             const signature2 = req.files?.signature2?.[0]?.path || null;
//             const signature3 = req.files?.signature3?.[0]?.path || null;

//             const newAction = new Action({
//                 actionStep,
//                 recommendation,
//                 allowedByHead,
//                 finalApproval,
//                 signature1,
//                 signature2,
//                 signature3
//             });

//             await newAction.save();
//             res.status(201).json({ message: 'Action submitted successfully', action: newAction });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Error submitting action', error });
//         }
//     }
// );

// // GET route to fetch actions
// router.get('/actions', async (req, res) => {
//     try {
//         const actions = await Action.find();
//         res.status(200).json(actions);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching actions', error });
//     }
// });

// export default router;


import express from "express";
import Take_Actions from "../models/Take_Actions.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// // Define __dirname for ES modules
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);


// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer for file uploads, saving files to 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads_TakeActions/'); // Specify the folder to store uploaded files
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
    { name: 'signature1', maxCount: 1 },
    { name: 'signature2', maxCount: 1 },
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
            recommendation,
            allowedByHead,
            finalApproval
        } = req.body;

        // Extract file metadata from req.files
        const { signature1, signature2, signature3} = req.files;

        // Create a new member with extracted data
        const newTake_Actions = new Take_Actions({
            recommendation,
            allowedByHead,
            finalApproval,
            signature1: signature1 ? signature1[0].originalname : "",  // File name for birthCertificate
            signature2: signature2 ? signature2[0].originalname : "",  // File name for otherDocument1
            signature3: signature3 ? signature3[0].originalname : ""   // File name for otherDocument2
        
        
        
        
        });

        // Save new member to the database
        await newTake_Actions.save();
        res.json("New Take Actions Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Read all data
 router.get("/", async (req, res) => {
     try {
         const takeActions = await Take_Actions.find();
            res.status(200).json(takeActions);
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
router.get('/uploads_TakeActions/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads_TakeActions', req.params.filename); // Adjust the path if necessary

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



export default router;
