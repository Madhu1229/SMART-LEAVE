// import mongoose from 'mongoose';

// const takeActionSchema = new mongoose.Schema({
//     actionStep: { type: String, required: true },
//     recommendation: { type: String, enum: ['Recommended', 'Not Recommended'], required: true },
//     allowedByHead: { type: String, enum: ['Allowed', 'Not Allowed'], required: true },
//     finalApproval: { type: String, enum: ['Approved', 'Not Approved'], required: true },
//     signature1: { type: String },
//     signature2: { type: String },
//     signature3: { type: String }
// }, { timestamps: true });

// const Take_Actions = mongoose.model('Take_Actions', takeActionSchema);

// export default Take_Actions;

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const takeAction1Schema = new Schema({



     
     recommendation: { type: String,  required: true },
     supervisingOfficerName: { type: String,  required: true },
     role: { type: String, required:false},
     signature1: { type: String, required: false },
     date1:{ type: String, required: false }

    

})

const Take_Actions1 = mongoose.model('Take_Actions1',takeAction1Schema);

export default Take_Actions1; // Use ES module export