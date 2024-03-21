const express = require("express");
const router = express.Router();
const interviewsController = require("../controllers/interviews");
const authenticateUser = require("../controllers/authenticate");
const datavalidation = require("../datavalidate/datavalidate");

//Get a list of all interviews
router.get("/", interviewsController.getInterviews);
//Get a single interview
router.get("/:id", interviewsController.getSingleInterview);

// POST Requests (Create)
router.post(
  "/",
  authenticateUser.authUserLogin,
  datavalidation.interviewValidation(),
  datavalidation.checkInterviewData,
  datavalidation.handleErrors(interviewsController.createInterview)
);

//Update an interview
router.put(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.interviewValidation(),
  datavalidation.checkInterviewData,
  datavalidation.handleErrors(interviewsController.updateInterview)
);

//Delete an interview
router.delete(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.handleErrors(interviewsController.deleteInterview)
);

module.exports = router;
