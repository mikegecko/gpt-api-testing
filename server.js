const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
// app.use(cors({
//   origin: '*', // Change to origin: ['https://example.com', 'https://another.example.com']
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

//Routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const { db_connect } = require('./utils/db');

//Connect to db
db_connect();

// Routes
//app.use('/', indexRouter);
app.use('/api/auth', authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});