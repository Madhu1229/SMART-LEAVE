import express from "express";
import Member from "../models/Member.js";
import multer from 'multer';
import path from 'path';

// Setup multer for file uploads, saving files to 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

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

        // Add the file upload check here
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        // Extract other form data from req.body
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
            designation,
            subDesignation,
            ministry,
            joiningDate,
            leaveTaken,
            leaveRemaining,
            role
        } = req.body;

        // Extract file metadata from req.files
        const { photo, birthCertificate, otherDocument1, otherDocument2 } = req.files;

        // Create a new member with extracted data
        const newMember = new Member({
            photo: photo ? photo[0].originalname : "", // File name for photo
            fullName,
            address: { street, city, state, zipCode },
            gender,
            birthday: new Date(birthday),
            age: Number(age),
            email,
            mobile,
            telephone,
            maritalStatus,
            educationLevel,
            memberID,
            designation,
            subDesignation,
            ministry,
            joiningDate: new Date(joiningDate),
            leaveTaken: Number(leaveTaken),
            leaveRemaining: Number(leaveRemaining),
            role,
            birthCertificate: birthCertificate ? birthCertificate[0].originalname : "",  // File name for birthCertificate
            otherDocument1: otherDocument1 ? otherDocument1[0].originalname : "",  // File name for otherDocument1
            otherDocument2: otherDocument2 ? otherDocument2[0].originalname : ""   // File name for otherDocument2
        });

        // Save new member to the database
        await newMember.save();
        res.json("Member Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Read all data
router.get("/", async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Update data
router.put("/update/:memberID", async (req, res) => {
    try {
        const memberID = req.params.memberID;
        const {
            photo,
            fullName,
            address,
            gender,
            birthday,
            age,
            email,
            mobile,
            telephone,
            maritalStatus,
            educationLevel,
            designation,
            subDesignation,
            ministry,
            joiningDate,
            leaveTaken,
            leaveRemaining,
            role,
            birthCertificate,
            otherDocument1,
            otherDocument2,
        } = req.body;

        if (!address) {
            return res.status(400).json({ error: "Address is required" });
        }
        const { street, city, state, zipCode } = address;

        const updateMember = {
            photo,
            fullName,
            address: { street, city, state, zipCode },
            gender,
            birthday: new Date(birthday),
            age: Number(age),
            email,
            mobile,
            telephone,
            maritalStatus,
            educationLevel,
            memberID,
            designation,
            subDesignation,
            ministry,
            joiningDate: new Date(joiningDate),
            leaveTaken: Number(leaveTaken),
            leaveRemaining: Number(leaveRemaining),
            role,
            birthCertificate,
            otherDocument1,
            otherDocument2,
        };

        const updatedMember = await Member.findOneAndUpdate({ memberID }, updateMember, { new: true });
        if (!updatedMember) {
            return res.status(404).send({ status: "Member not found" });
        }
        res.status(200).send({ status: "Member updated", member: updatedMember });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating member", error: err.message });
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

export default router;
