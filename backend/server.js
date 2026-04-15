require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");
const aiRoute = require("./routes/ai");

const app = express();

app.use(cors());
app.use(express.json()); // ✅ VERY IMPORTANT

app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});