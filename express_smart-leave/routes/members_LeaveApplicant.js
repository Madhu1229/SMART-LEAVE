import express from "express";
import Member_LeaveApplicant from "../models/Member_LeaveApplicant.js";
import multer from 'multer';
import path from 'path';



// Setup multer for file uploads, saving files to 'uploads' directory
const storage_LeaveApplicant = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads_LeaveApplicant/'); // Specify the folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload_LeaveApplicant = multer({ storage: storage_LeaveApplicant });

const router = express.Router();

// Insert data into the database
router.post("/add", upload_LeaveApplicant.fields([
    { name: 'applicantSignature', maxCount: 1 },
    { name: 'officerActingSignature', maxCount: 1 },
 
]), async (req, res) => {
    try {
        console.log(req.files);

        // Add the file upload check here
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        // Extract other form data from req.body
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

        // Create a new member with extracted data
        const newMember_LeaveApplicant = new Member_LeaveApplicant({
            
            name,
            designation,
            subDesignation,
            ministry,
            leaveDaysC:Number(leaveDaysC),
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
            applicantSignature: applicantSignature ? applicantSignature[0].originalname : "", // File name for Applicant signature
            officerActingName,
            officerActingSignature:  officerActingSignature ?  officerActingSignature[0].originalname : "",  // File name for oficer acting signature
            
        });

        // Save Leave Apply Information to the database
        await newMember_LeaveApplicant.save();
        res.json("Leave Apply Submitted");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});



 // Read all data
// router.get("/", async (req, res) => {
//     try {
//         const members = await Member.find();
//         res.status(200).json(members);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err.message });
//     }
// });

// Update data
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

// Delete data
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

 // Get single member data
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

 //Serve files from the 'uploads' folder
// router.get('/uploads_LeaveApplicant/:filename', (req, res) => {
//     const filePath = path.join(__dirname, '../uploads_LeaveApplicant', req.params.filename); // Adjust the path if necessary

//      // Log the file path for debugging
//  console.log('Requested file path:', filePath);

//     Send the file for download
// res.download(filePath, (err) => {
// if (err) {
// console.error(err);
// res.status(404).send('File not found.');
// }
// });
// });



export default router;
