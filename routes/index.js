// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/companies", require("./companies"));
router.use("/users", require("./users"))

module.exports = router;
