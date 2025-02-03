import express from "express";
import Member from "../models/Member.js";
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';


// // Define __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer for file uploads, saving files to 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to store uploaded files
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
    { name: 'photo', maxCount: 1 },
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'otherDocument1', maxCount: 1 },
    { name: 'otherDocument2', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log(req.files);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const {
            fullName,
            street,
            city,
            state,
            zipCode,
            gender,
            birthday,
            age,
            email,
            mobile,
            telephone,
            maritalStatus,
            educationLevel,
            memberID,
            serviceNo,
            nic,
            bloodGroup,
            designation,
            subDesignation,
            ministry,
            joiningDate,
            leaveTaken,
            leaveRemaining,
            role
        } = req.body;

        const { photo, birthCertificate, otherDocument1, otherDocument2 } = req.files;

        // Random 4-digit number
        const rawPassword = fullName.substring(0, 3).toLowerCase() + '1234'; 
        console.log(rawPassword);

        // ✅ Hash the password before saving
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const newMember = new Member({
            photo: photo ? photo[0].originalname : "",
            fullName,
            address: { street, city, state, zipCode },
            password: hashedPassword,  // ✅ Store hashed password
            gender,
            birthday: new Date(birthday),
            age: Number(age),
            email,
            mobile,
            telephone,
            maritalStatus,
            educationLevel,
            memberID,
            serviceNo,
            nic,
            bloodGroup,
            designation,
            subDesignation,
            ministry,
            joiningDate: new Date(joiningDate),
            leaveTaken: Number(leaveTaken),
            leaveRemaining: Number(leaveRemaining),
            role,
            birthCertificate: birthCertificate ? birthCertificate[0].originalname : "",
            otherDocument1: otherDocument1 ? otherDocument1[0].originalname : "",
            otherDocument2: otherDocument2 ? otherDocument2[0].originalname : ""
        });
        console.log(newMember);
        await newMember.save();
        
        // ✅ Send password in response (for the user to note)
        res.json({ message: "Member Added", generatedPassword: rawPassword });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});


// Delete data
router.delete("/delete/:memberID", async (req, res) => {
    try {
        const memberID = req.params.memberID;
        const deletedMember = await Member.findOneAndDelete({ memberID });
        if (!deletedMember) {
            return res.status(404).send({ status: "Member not found" });
        }
        res.status(200).send({ status: "Member deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error deleting member", error: err.message });
    }
});

// Get single member data
router.get("/get/:memberID", async (req, res) => {
    try {
        const memberID = req.params.memberID;
        const member = await Member.findOne({ memberID });
        if (!member) {
            return res.status(404).json({ status: "Member not found" });
        }
        res.status(200).send({ status: "Member fetched", member });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching member", error: err.message });
    }
});

// Serve files from the 'uploads' folder
router.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename); // Adjust the path if necessary

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
