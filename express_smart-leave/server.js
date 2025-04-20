// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import { config } from "dotenv";
// // import multer from 'multer';
// // // new code..................
// import { fileURLToPath } from 'url';
// //  import fs from 'fs';
//  import path from 'path';
// //  import { format } from 'date-fns'; // Use date-fns to format the date
// // .......................

// const app = express();
// config();  // Load environment variables from .env file

// // new code..................
// // Define __dirname for ES modules
//  const __filename = fileURLToPath(import.meta.url);
//  const __dirname = path.dirname(__filename);

// const PORT = process.env.PORT || 8093;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // new new new new new code
// app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded form data
// // new code..........

// //  Serve static files from the uploads directory
//  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//  // Serve static files from the uploads_LeaveApplicant directory
// app.use('/uploads_LeaveApplicant', express.static(path.join(__dirname, 'uploads_LeaveApplicant')));

//  // Serve static files from the uploads_LeaveApplicant directory
//  app.use('/uploads_TakeActions', express.static(path.join(__dirname, 'uploads_TakeActions')));






//  // Configure storage for uploads folder
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, 'uploads/'); // Specify the folder to store uploaded files
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null,file.originalname); // Name the file
// //     }
// // });


// // const upload = multer({
// //   storage: storage,
// //   limits: { fileSize: 10 * 1024 * 1024 }, // Optional: Limit file size (e.g., 10MB)
// // });

// // // Configure storage for uploads_LeaveApplicant folder
// // const storage_LeaveApplicant = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //       cb(null, 'uploads_LeaveApplicant/'); // Specify the folder to store files
// //   },
// //   filename: async (req, file, cb) => {
// //       const fileName = path.parse(file.originalname).name; // Get file name without extension
// //       const fileExt = path.extname(file.originalname);      // Get file extension
// //       const currentDate = format(new Date(), 'yyyy-MM-dd'); // Get the current date in YYYY-MM-DD format

// //       // Function to check if a file exists and modify the name if it already exists
// //       const getUniqueFileName = async (name, ext, date) => {
// //           let newFileName = `${name}(${date})${ext}`;
// //           let newFilePath = path.join('uploads_LeaveApplicant/', newFileName);
// //           let count = 2;

// //           try {
// //               // Use asynchronous fs.promises.access to check for file existence
// //               while (await fs.promises.access(newFilePath).then(() => true).catch(() => false)) {
// //                   newFileName = `${name}(${date})(${count})${ext}`;
// //                   newFilePath = path.join('uploads_LeaveApplicant/', newFileName);
// //                   count++;
// //               }
// //           } catch (err) {
// //               return cb(err);
// //           }

// //           return newFileName;
// //       };

// //       // Generate a unique file name
// //       try {
// //           const newFileName = await getUniqueFileName(fileName, fileExt, currentDate);
// //           cb(null, newFileName);
// //       } catch (err) {
// //           cb(err);
// //       }
// //   }
// // });

// // const upload_LeaveApplicant = multer({
// //   storage: storage_LeaveApplicant,
// //   limits: { fileSize: 10 * 1024 * 1024 }, // Optional: limit file size
// // });


// const URL = process.env.MONGODB_URL;

// // Connect to MongoDB
// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true 
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB Connection Success!");
// });

// // Access members.js in routes folder
// import memberRouter from "./routes/members.js";
// app.use("/Member", memberRouter);

// // Access members_LeaveApplicant.js in routes folder
// import member_LeaveApplicantRouter from "./routes/members_LeaveApplicant.js";
// app.use("/Member_LeaveApplicant", member_LeaveApplicantRouter);

// // Access members_LeaveApplicant.js in routes folder
// import take_actionRouter from "./routes/takeActions.js";
// app.use("/Take_Actions", take_actionRouter);


// //matching some record in 2 data collections..




// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is up and running on port number: ${PORT}`);
// });
// import { config } from "dotenv";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';
import {googleAuth} from "./google.auth.js";
import passport from "passport";
import session from "express-session";
import { routesInit } from "./routes/google_auth_index.js"; 
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();


const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  console.error("❌ Error: MongoDB Connection String is not defined!");
  process.exit(1); // Stop the server
}

// Initialize express app
const app = express();
// config();  // Load environment variables from .env file

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8093;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// For URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from various upload directories
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads_LeaveApplicant', express.static(path.join(__dirname, 'uploads_LeaveApplicant')));
app.use('/uploads_TakeActions/uploads_TakeActions1', express.static(path.join(__dirname, 'uploads_TakeActions/uploads_TakeActions1')));
app.use('/uploads_TakeActions/uploads_TakeActions2', express.static(path.join(__dirname, 'uploads_TakeActions/uploads_TakeActions2')));
app.use('/uploads_TakeActions/uploads_TakeActions3', express.static(path.join(__dirname, 'uploads_TakeActions/uploads_TakeActions3')));

app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl: mongoUrl,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // Time to live for session
      }),
    cookie:{
      secure:false,
      expires:new Date(Date.now() + 10000),
      maxAge:10000
    }
  })
)
console.log("✅ MongoDB session store initialized successfully!");
app.use(passport.initialize());
app.use(passport.session());

// Initialize Google Authentication
googleAuth(passport);

// Set up Google OAuth routes
routesInit(app, passport);

// ✅ Serve a simple login page at `/`
app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to Smart Leave</h2>
    <a href="/auth/google">
      <button>Login with Google</button>
    </a>
  `);
});


//  app.get("/",(req,res,next)=>{
//    res.send("<a href = 'http://localhost:8093/auth/google'>Login with Google </a>");
//    next();

//  }
//  )

// MongoDB connection
const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL).catch((error) => {
  console.error("MongoDB connection failed:", error);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

// Import routes
import memberRouter from "./routes/members.js";
import member_LeaveApplicantRouter from "./routes/members_LeaveApplicant.js";
import take_action1Router from "./routes/takeActions1.js";
import take_action2Router from "./routes/takeActions2.js";
import take_action3Router from "./routes/takeActions3.js";
import auth from "./routes/authRoutes.js"
import leaveNotificationsRouter from "./routes/leaveNotifications.js"

// Use routes in the app
app.use("/Member", memberRouter);
app.use("/Member_LeaveApplicant", member_LeaveApplicantRouter);
app.use("/Take_Actions1", take_action1Router);
app.use("/Take_Actions2", take_action2Router);
app.use("/Take_Actions3", take_action3Router);
app.use("/auth", auth);
app.use("/leaveNotifications",leaveNotificationsRouter)




// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
  googleAuth(passport);
  routesInit(app,passport)
});

// const leaveNotificationRoutes = require('./routes/leaveNotifications');
// app.use('/api/notifications', leaveNotificationRoutes);

// GOOGLE_CLIENT_ID :process.env.GOOGLE_CLIENT_ID
// GOOGLE_CLIENT_SECRET :process.env.GOOGLE_CLIENT_SECRET
// GOOGLE_REDIRECT_URL :process.env.GOOGLE_REDIRECT_URL
// SESSION_SECRET : process.env.SESSION_SECRET