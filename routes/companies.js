const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companies");

// GET Requests (Read)
router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getSingleCompany);

// POST Requests (Create)
router.post("/", companyController.createCompany);

//PUT Request (update)
router.put("/:id", companyController.updateCompany);

// DELETE Requests (Delete)
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
