// Importing the 'express' library to create a router
const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/company", require("./company"));

module.exports = router;
