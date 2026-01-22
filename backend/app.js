const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));


app.use(cors());
app.use(express.json());
const compileRoutes = require("./routes/compileRoutes");
app.use("/api/compile", compileRoutes);
const liveClassRoutes = require("./routes/liveClassRoutes");

app.use("/api/live-classes", liveClassRoutes);




const courseRoutes = require("./routes/courseRoutes");

app.use("/api/courses", courseRoutes);




module.exports = app;
