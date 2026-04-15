const express = require("express");
const multer = require("multer");
const Papa = require("papaparse");

const router = express.Router();

// store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const csvData = file.buffer.toString();

    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        res.json(results.data);
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Error processing file" });
  }
});

module.exports = router;