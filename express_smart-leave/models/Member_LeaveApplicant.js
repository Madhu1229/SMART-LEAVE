import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const member_LeaveApplicantSchema = new Schema({

    name: { type: String, required: true}, // Use String for file paths or URLs of uploaded files
    designation: { type: String, required: true },
    subDesignation: { type: String, required: true },
    ministry: { type: String, required: true },
    leaveDaysC: { type: Number, required: true },
    leaveDaysV: { type: Number, required: true },
    leaveDaysO: { type: Number, required: true },
    leaveTakenC: { type: Number, required: true },
    leaveTakenV: { type: Number, required: true },
    leaveTakenO: { type: Number, required: true },
    date: { type: Date, required: true },
    firstAppointmentDate: { type: Date, required: true },
    resumeDutiesDate: { type: Date, required: true },
    reasonForLeave: { type: String, required: true },
    applicantSignature: { type: String, required: true },
    officerActingName: { type: String, required: true },
    officerActingSignature: { type: String,required: true }

})

const Member_LeaveApplicant = mongoose.model('Member_LeaveApplicant',member_LeaveApplicantSchema);

export default Member_LeaveApplicant; // Use ES module export