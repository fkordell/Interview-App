const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const authenticateUser = require("../controllers/authenticate");
const datavalidation = require("../datavalidate/datavalidate");

// GET Requests (Read)
router.get("/", userController.getUsers);
router.get("/:id", userController.getSingleUser);

// POST Requests (Create)
router.post(
  "/",
  authenticateUser.authUserLogin,
  datavalidation.userValidation(),
  datavalidation.checkUserData,
  datavalidation.handleErrors(userController.createUser)
);

//PUT Request (update)
router.put(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.userValidation(),
  datavalidation.checkUserData,
  datavalidation.handleErrors(userController.updateUser)
);

// DELETE Requests (Delete)
router.delete(
  "/:id",
  authenticateUser.authUserLogin,
  datavalidation.handleErrors(userController.deleteUser)
);

module.exports = router;
