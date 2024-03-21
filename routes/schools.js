const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schools");
const authenticateUser = require("../controllers/authenticate");
const datavalidation = require("../datavalidate/datavalidate");

// GET Requests (Read)
router.get("/", schoolController.getSchools);
router.get("/:id", schoolController.getSingleSchool);

// POST Requests (Create)
router.post(
  "/",
  authenticateUser.authUserLogin,
  datavalidation.schoolValidation(),
  datavalidation.checkInterviewData,
  datavalidation.handleErrors(schoolController.createSchool)
);

//PUT Request (update)
router.put(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.schoolValidation(),
  datavalidation.checkInterviewData,
  datavalidation.handleErrors(schoolController.updateSchool)
);

// DELETE Requests (Delete)
router.delete(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.handleErrors(schoolController.deleteSchool)
);

module.exports = router;
