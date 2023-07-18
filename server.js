const express = require('express');
const bodyParser = require('body-parser');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// Routes
app.use('/', indexRouter);
app.use('/auth')

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});