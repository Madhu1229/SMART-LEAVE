import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const takeAction3Schema = new Schema({

     finalApproval: { type: String, required: true },
     leaveClerkName: { type: String,  required: true },
     role: { type: String, required:true},
     signature3: { type: String, required: false },
     date3:{ type: String, required: false },
     status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"], // Define possible status values
          default: "Pending"  // Default to Pending if not specified
      }
     

})

const Take_Actions3 = mongoose.model('Take_Actions3',takeAction3Schema);

export default Take_Actions3; // Use ES module export

