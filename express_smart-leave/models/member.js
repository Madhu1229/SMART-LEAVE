import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    photo: { type: String, required: true }, // Removed unique constraint
    fullName: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    password: { type: String, required: true }, 
    gender: { type: String, required: true },
    birthday: { type: Date, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, 
    mobile: { type: String, required: true },
    telephone: { type: String },
    maritalStatus: { type: String, required: true },
    educationLevel: { type: String, required: true },
    memberID: { type: String, required: true, unique: true },
    serviceNo: { type: String, required: true, unique: true },
    nic: { type: String, required: true, unique: true },
    bloodGroup: { type: String, required: true },
    designation: { type: String, required: true },
    subDesignation: { type: String, required: true },
    ministry: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    leaveTaken: { type: Number, required: true },
    leaveRemaining: { type: Number, required: true },
    role: { type: String, required: true },
    birthCertificate: { type: String, required: true }, 
    otherDocument1: { type: String, required: true }, 
    otherDocument2: { type: String, required: true }, 
}, { timestamps: true }); 

const Member = mongoose.model("Member", memberSchema);

export default Member;
