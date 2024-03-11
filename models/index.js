const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Setting the default Promise library for Mongoose to the global Promise object
mongoose.Promise = global.Promise;

// Retrieving the MongoDB connection URL from the environment variables
const mongoURL = process.env.MONGO_URL;

// Creating an object to store references to the database connection, URL, and models
const db = {};

// Storing the mongoose instance in the db object
db.mongoose = mongoose;

// Storing the MongoDB connection URL in the db object
db.url = mongoURL;

// Importing and storing all the models in the db object
db.companies = require("./companyModel")(mongoose);
//db. = require("./userModel")(mongoose);
//db. = require("./schoolModel")(mongoose);
//db. = require("./interviewModel")(mongoose);

// Exporting the db object for use in other modules
module.exports = db;
