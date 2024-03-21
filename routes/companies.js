const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companies");
const authenticateUser = require("../controllers/authenticate");
const datavalidation = require("../datavalidate/datavalidate");

// GET Requests (Read)
router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getSingleCompany);

// POST Requests (Create)
router.post(
  "/",
  authenticateUser.authUserLogin,
  datavalidation.companyValidation(),
  datavalidation.checkCompanyData,
  datavalidation.handleErrors(companyController.createCompany)
);

//PUT Request (update)
router.put(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.companyValidation(),
  datavalidation.checkCompanyData,
  datavalidation.handleErrors(companyController.updateCompany)
);

// DELETE Requests (Delete)
router.delete(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.handleErrors(companyController.deleteCompany)
);

module.exports = router;
