import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const takeAction2Schema = new Schema({
    
     allowedByHead: { type: String, required: true },
     headOfDepartmentName: { type: String,  required: true },
     role: { type: String, required:true},
     signature2: { type: String, required: false },
     date2:{ type: String, required: false }
    

})

const Take_Actions2 = mongoose.model('Take_Actions2',takeAction2Schema);

export default Take_Actions2; // Use ES module export