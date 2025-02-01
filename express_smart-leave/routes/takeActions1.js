import express from "express";
import Take_Actions1 from "../models/Take_Actions1.js";
import Member from "../models/Member.js"; // Import the Member model
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads_TakeActions/uploads_TakeActions1');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

const router = express.Router();

// POST route to add data
router.post("/add", upload.fields([
    { name: 'signature1', maxCount: 1 },
]), async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const {
            recommendation,
            supervisingOfficerName,
            role,
            date1
        } = req.body;

        const { signature1 } = req.files;

        const newTake_Actions1 = new Take_Actions1({
            recommendation,
            supervisingOfficerName,
            role,
            date1,
            signature1: signature1 ? signature1[0].originalname : "",
        });

        await newTake_Actions1.save();
        res.json("New Take Actions Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// GET route to fetch all data
router.get("/", async (req, res) => {
    try {
        const takeActions1 = await Take_Actions1.find();
        res.status(200).json(takeActions1);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// API Endpoint to match supervisingOfficerName and role with fullName and role in Member collection
router.get("/match-members", async (req, res) => {
    try {
        // Fetch all Take_Actions1 records
        const takeActions = await Take_Actions1.find();

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
            const key = `${action.supervisingOfficerName}|${action.role}`;
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

// Serve files from the uploads folder
router.get('/uploads_TakeActions/uploads_TakeActions1/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads_TakeActions/uploads_TakeActions1', req.params.filename);
    console.log('Requested file path:', filePath);
    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('File not found.');
        }
    });
});

export default router;