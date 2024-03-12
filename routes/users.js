const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// GET Requests (Read)
router.get("/", userController.getUsers);
router.get("/:id", userController.getSingleUser);

// POST Requests (Create)
router.post("/", userController.createUser);

//PUT Request (update)
router.put("/:id", userController.updateUser);

// DELETE Requests (Delete)
router.delete("/:id", userController.deleteUser);

module.exports = router;