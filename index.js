const express = require("express");
const conn = require("./db");
const env = require("dotenv");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/Admin/auth");
const adminRoutes = require("./Routes/Admin/admin");
const ReportRoutes = require("./Routes/report.route");

const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
mongoose.set('strictPopulate', false);

// const Email = require("./Routes/Email");
conn.connectDB();
app.use(cors());

app.use(cookieParser());
app.use(express.json()); // For parsing application/json
env.config();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", ReportRoutes);
app.get("/", (req, res) => {
    return res.send("Welcome To Ketan's API's World");
  });
  
 app.listen(PORT, () => {
  console.log(
    `server running successfully on port http://localhost:${PORT}`
  );
});

