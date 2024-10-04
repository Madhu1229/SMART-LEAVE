const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({

    fullName: {type:String, required:true},
    address: { street: {type:String, required:true}, city: {type:String, required:true}, state: {type:String, required:true}, zipCode: {type:String, required:true} },
    gender: {type:String, required:true},
    birthday: {type:String, required:true},
    age: {type:String, required:true},
    email: {type:String, required:true},
    mobile: {type:String, required:true},
    telephone: {type:String},
    maritalStatus: {type:String, required:true},
    educationLevel: {type:String, required:true},
    designation: {type:String, required:true},
    subDesignation: {type:String, required:true},
    ministry: {type:String, required:true},
    joiningDate: {type:String, required:true},
    leaveTaken: {type:String, required:true},
    leaveRemaining: {type:String, required:true},
    role: {type:String, required:true},
    birthCertificate:{type:String} ,
    otherDocument1: {type:String},
    otherDocument2: {type:String}


})

const Member = mongoose.model("Member",memberSchema);

module.exports = Member;
