import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const memberSchema = new Schema({

        photo: { type: String, required: false}, // Use String for file paths or URLs of uploaded files
        fullName: { type: String, required: true },
        address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
        },
        gender: { type: String, required: true },
        birthday: { type: Date, required: true }, // Use Date for birthdays
        age: { type: Number, required: true }, // Use Number for age
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        telephone: { type: String },
        maritalStatus: { type: String, required: true },
        educationLevel: { type: String, required: true },
        memberID:{type: String, required: true },
        designation: { type: String, required: true },
        subDesignation: { type: String, required: true },
        ministry: { type: String, required: true },
        joiningDate: { type: Date, required: true }, // Use Date for joining dates
        leaveTaken: { type: Number, required: true }, // Use Number for leave taken
        leaveRemaining: { type: Number, required: true }, // Use Number for leave remaining
        role: { type: String, required: true },
        birthCertificate: { type: String,required: false }, // Assuming this is a file path or URL
        otherDocument1: { type: String,required: false },
        otherDocument2: { type: String,required:false }

})

const Member = mongoose.model('Member',memberSchema);

export default Member; // Use ES module export
