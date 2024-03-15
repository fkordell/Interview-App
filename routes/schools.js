const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schools");

// GET Requests (Read)
router.get("/", schoolController.getSchools);
router.get("/:id", schoolController.getSingleSchool);

// POST Requests (Create)
router.post("/", schoolController.createSchool);

//PUT Request (update)
router.put("/:id", schoolController.updateSchool);

// DELETE Requests (Delete)
router.delete("/:id", schoolController.deleteSchool);

module.exports = router;