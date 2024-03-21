// Importing the 'body' and 'validationResult' objects from the 'express-validator' library
const { body, validationResult } = require("express-validator");
// Loading environment variables from a '.env' file into process.env
require("dotenv").config();

/* Middleware function to validate companies.*/
const companyValidation = () => {
  return [
    body("companyName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a company name."),

    body("companyDescription")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a company description."),

    body("industryCategory")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide an industry category."),

    body("location.address")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide an address."),

    body("location.city")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a city."),

    body("location.state")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a state."),

    body("location.country")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a country."),

    body("contactInfo.firstName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    body("contactInfo.lastName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a last name."),

    body("contactInfo.email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email."),

    body("contactInfo.favoriteColor")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a favorite color."),

    body("contactInfo.birthday")
      .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/)
      .withMessage("Please provide a valid date in the format mm-dd-yyyy.")
      .toDate(),

    body("websiteURL")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a website URL."),
  ];
};

// Middleware function to validate company data received in the request body.
const checkCompanyData = async (req, res, next) => {
  const {
    companyName,
    companyDescription,
    industryCategory,
    location: { address, city, state, country },
    contactInfo: { firstName, lastName, email, favoriteColor, birthday },
    websiteURL,
  } = req.body;

  let errors = [];

  errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");

    return res
      .status(400)
      .send({ error: "Bad Request - Missing data: " + errorMessage });
  }

  next();
};
/* End of companies validation */
/*******************************/

/* Middleware function to validate interviews.*/
const interviewValidation = () => {
  return [
    body("interviewer")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide an interviewer."),

    body("position")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a position."),

    body("location")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a location."),

    body("date")
      .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/)
      .withMessage("Please provide a valid date in the format mm-dd-yyyy.")
      .toDate(),

    body("time")
      .trim()
      .matches(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
      .withMessage("Please provide a valid time in the format hh:mm AM/PM."),
  ];
};

const checkInterviewData = async (req, res, next) => {
  const { interviewer, position, location, date, time } = req.body;

  let errors = [];

  errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");

    return res
      .status(400)
      .send({ error: "Bad Request - Missing data: " + errorMessage });
  }

  next();
};
/* End of interviews validation */
/*******************************/

/* Middleware function to validate schools.*/
const schoolValidation = () => {
  return [
    body("schoolName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a school name."),

    body("schoolAddress")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a school address."),

    body("schoolPhone")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a school phone number."),
  ];
};

const checkSchoolData = async (req, res, next) => {
  const { schoolName, schoolAddress, schoolPhone } = req.body;

  let errors = [];

  errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");

    return res
      .status(400)
      .send({ error: "Bad Request - Missing data: " + errorMessage });
  }

  next();
};
/* End of schools validation */
/*******************************/

/* Middleware function to validate users.*/
const userValidation = () => {
  return [
    body("userFirstName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    body("userLastName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a last name."),

    body("userEmail")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email address."),

    body("userPassword")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ];
};

const checkUserData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join(" ");

    return res.status(400).send({
      error: "Bad Request - Missing or invalid data: " + errorMessage,
    });
  }

  next();
};
/* End of users validation */
/*******************************/

// Define a higher-order function named 'handleErrors' which takes a function 'fn' as input
const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Export an object containing various functions for handling ticket and employee data validation

module.exports = {
  companyValidation,
  checkCompanyData,
  interviewValidation,
  checkInterviewData,
  schoolValidation,
  checkSchoolData,
  userValidation,
  checkUserData,
  handleErrors,
};
