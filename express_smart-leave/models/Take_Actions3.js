import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const takeAction3Schema = new Schema({

     finalApproval: { type: String, required: true },
     leaveClerkName: { type: String,  required: true },
     role: { type: String, required:true},
     signature3: { type: String, required: false },
     date3:{ type: String, required: false }
    

})

const Take_Actions3 = mongoose.model('Take_Actions3',takeAction3Schema);

export default Take_Actions3; // Use ES module export

