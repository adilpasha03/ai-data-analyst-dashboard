require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");
const aiRoute = require("./routes/ai");

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ Routes
app.use("/upload", uploadRoute);
app.use("/ai", aiRoute);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ PORT (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});