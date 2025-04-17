import express from "express";
import Take_Actions2 from "../models/Take_Actions2.js";

//matching 2 data collections...
import Member from "../models/Member.js";

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
        cb(null, 'uploads_TakeActions/uploads_TakeActions2'); // Specify the folder to store uploaded files
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
    { name: 'signature2', maxCount: 1 }
    
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
            allowedByHead,
            headOfDepartmentName,
            role,
            date2
        } = req.body;

        // Extract file metadata from req.files
        const { signature2} = req.files;

        // Create a new member with extracted data
        const newTake_Actions2 = new Take_Actions2({
            
            allowedByHead,
            headOfDepartmentName,
            role,
            date2,
            signature2: signature2 ? signature2[0].originalname : "" // File name for otherDocument1
        

        });

        // Save new member to the database
        await newTake_Actions2.save();
        res.json("New Take Actions Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Read all data
 router.get("/", async (req, res) => {
     try {
         const takeActions2 = await Take_Actions2.find();
            res.status(200).json(takeActions2);
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


// API Endpoint to match supervisingOfficerName and role with fullName and role in Member collection
router.get("/match-members", async (req, res) => {
    try {
        // Fetch all Take_Actions1 records
        const takeActions = await Take_Actions2.find();

        // Fetch all Member records
        const members = await Member.find();

        // Create a map for quick lookup of members by fullName and role
        const memberMap = new Map();
        members.forEach(member => {
            const key = `${member.fullName}|${member.role}`;
            memberMap.set(key, member);
        });

        // Match Take_Actions1 records with Member records
        const matchedData = takeActions.map(action => {
            const key = `${action.headOfDepartmentName}|${action.role}`;
            const matchedMember = memberMap.get(key);

            return {
                ...action.toObject(), // Convert Mongoose document to plain object
                matchedMember: matchedMember || null, // Include matched member details if found
            };
        });

        res.status(200).json({ status: "Success", data: matchedData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

// Serve files from the 'uploads' folder
router.get('/uploads_TakeActions/uploads_TakeActions2:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads_TakeActions/uploads_TakeActions2', req.params.filename); // Adjust the path if necessary

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
