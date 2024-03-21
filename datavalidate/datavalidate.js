// Importing the 'body' and 'validationResult' objects from the 'express-validator' library
const { body, validationResult } = require("express-validator");
// Loading environment variables from a '.env' file into process.env
require("dotenv").config();

// Middleware function to validate company name.
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
      .isISO8601()
      .withMessage(
        "Please provide a valid ISO 8601 formatted birthday as yyyy-mm-dd."
      )
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

// Define a higher-order function named 'handleErrors' which takes a function 'fn' as input
const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Export an object containing various functions for handling ticket and employee data validation

module.exports = {
  companyValidation,
  checkCompanyData,
  handleErrors,
};
