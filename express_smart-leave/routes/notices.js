const express = require("express");
const multer = require("multer");
const Notice = require("../models/Notice");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file?.filename;

  try {
    const newNotice = new Notice({ title, description, image });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
