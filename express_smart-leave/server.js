import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import multer from 'multer';
// new code..................
import { fileURLToPath } from 'url';
import path from 'path';
// .......................

const app = express();
config();  // Load environment variables from .env file

// new code..................
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ...........................




const PORT = process.env.PORT || 8093;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// new code..........
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded form data



// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname); // Name the file
    }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Optional: Limit file size (e.g., 10MB)
});


const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

// Access members.js in routes folder
import memberRouter from "./routes/members.js";
app.use("/Member", memberRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});

