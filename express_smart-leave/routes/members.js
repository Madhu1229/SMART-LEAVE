import express from "express";
import Member from "../models/Member.js";
import multer from 'multer'; 
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Insert data in database
router.post("/add", async (req, res) => {
  try {
    const {
      photo,
      fullName,
      street,
      city,
      state,
      zipCode,
      gender,
      birthday,
      age,
      email,
      mobile,
      telephone,
      maritalStatus,
      educationLevel,
      memberID,
      designation,
      subDesignation,
      ministry,
      joiningDate,
      leaveTaken,
      leaveRemaining,
      role,
      birthCertificate,
      otherDocument1,
      otherDocument2,
    } = req.body;

    const newMember = new Member({
      photo,
      fullName,
      address,
      gender,
      birthday: new Date(birthday),
      age: Number(age),
      email,
      mobile,
      telephone,
      maritalStatus,
      educationLevel,
      memberID,
      designation,
      subDesignation,
      ministry,
      joiningDate: new Date(joiningDate),
      leaveTaken: Number(leaveTaken),
      leaveRemaining: Number(leaveRemaining),
      role,
      birthCertificate,
      otherDocument1,
      otherDocument2,
    });

    await newMember.save();
    res.json("Member Added");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Read all data
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Update data
router.put("/update/:memberID", async (req, res) => {
  try {
    const memberID = req.params.memberID;
    const {
      photo,
      fullName,
      address,
      gender,
      birthday,
      age,
      email,
      mobile,
      telephone,
      maritalStatus,
      educationLevel,
      designation,
      subDesignation,
      ministry,
      joiningDate,
      leaveTaken,
      leaveRemaining,
      role,
      birthCertificate,
      otherDocument1,
      otherDocument2,
    } = req.body;

    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }
    const { street, city, state, zipCode } = address;

    const updateMember = {
      photo,
      fullName,
      address: { street, city, state, zipCode },
      gender,
      birthday: new Date(birthday),
      age: Number(age),
      email,
      mobile,
      telephone,
      maritalStatus,
      educationLevel,
      memberID,
      designation,
      subDesignation,
      ministry,
      joiningDate: new Date(joiningDate),
      leaveTaken: Number(leaveTaken),
      leaveRemaining: Number(leaveRemaining),
      role,
      birthCertificate,
      otherDocument1,
      otherDocument2,
    };

    const updatedMember = await Member.findOneAndUpdate({ memberID }, updateMember, { new: true });
    res.status(200).send({ status: "Member updated", member: updatedMember });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error updating member", error: err.message });
  }
});

// Delete data
router.delete("/delete/:memberID", async (req, res) => {
  try {
    const memberID = req.params.memberID;
    await Member.findOneAndDelete({ memberID });
    res.status(200).send({ status: "Member deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error deleting member", error: err.message });
  }
});

// Get single member data
router.get("/get/:memberID", async (req, res) => {
  try {
    const memberID = req.params.memberID;
    const member = await Member.findOne({ memberID });
    if (!member) {
      return res.status(404).json({ status: "Member not found" });
    }
    res.status(200).send({ status: "Member fetched", member });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error fetching member", error: err.message });
  }
});

export default router;
