const express = require("express");
const router = express.Router();
const authenticateController = require("../controllers/authenticate");

router.get("/", authenticateController.authUserLogin);

module.exports = router;
