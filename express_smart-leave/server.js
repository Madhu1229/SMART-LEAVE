 const express = require("express");
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 const cors = require("cors");
 const dotenv = require("dotenv");

const app = express();
dotenv.config();  // Load environment variables from .env file

const PORT = process.env.PORT || 8081;


 app.use(cors());
 app.use(bodyParser.json());

 const URL = process.env.MONGODB_URL;

 mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
    

 });

 const connection = mongoose.connection;
 connection.once("open" , () => {
    console.log("MongoDB Connection Success!")
 })



// Access members.js in routes folder
const memberRouter = require("./routes/members.js")
app.use("/member",memberRouter);
















app.listen(PORT , () =>{
    console.log(`Server is up and running on port number: ${PORT}`)
});