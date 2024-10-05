 import express from "express";
 import mongoose from "mongoose";
 import bodyParser from "body-parser";
 import cors from "cors";
 import { config } from "dotenv";

 const { connect, connection: _connection } = mongoose;

 
const app = express();
config();  // Load environment variables from .env file

const PORT = process.env.PORT||8085;


 app.use(cors());
 app.use(bodyParser.json());


 const URL = process.env.MONGODB_URL;

 connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
    

 });

 const connection = _connection;
 connection.once("open" , () => {
    console.log("MongoDB Connection Success!")
 })



// Access members.js in routes folder
import memberRouter from "./routes/members.js";
app.use("/Member",memberRouter);



app.listen(PORT , () =>{
    console.log(`Server is up and running on port number: ${PORT}`)
});