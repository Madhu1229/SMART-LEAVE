
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

     googleId: { type: String, required: true,unique: true, },
     gmail: { type: String,  required: true,unique: true },
     displayName: { type: String, required:true},
     image: { type: String, required: true},
     firstName:{ type: String, required: true },
     lastName:{ type: String, required: true },
     role: {
          type: String,
          enum: ["user", "admin"], // Only allow these roles
          default: "user", // Default role is "user"
        },
},{

timestamps:true

})

const User = mongoose.model('User',userSchema);

export default User; // Use ES module export

