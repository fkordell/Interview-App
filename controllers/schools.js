const { ObjectId } = require("mongodb");
const db = require("../models");
const Schools = db.schools;

// GET Request Controllers (Read only) - for all schools
const getSchools = async (req, res, next) => {
  try {
    const schools = await Schools.find({});
    const formattedSchools = schools.map((school) => ({
      _id: school._id,
      schoolName: school.schoolName,
      schoolAddress: school.schoolAddress,
      schoolPhone: school.schoolPhone
    }));
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(formattedSchools);
  } catch (err) {
    console.error("Error occurred while getting schools:", err);
    res
      .status(500)
      .json({ message: "An error occurred while getting schools." });
  }
};

// GET Request Controllers (Read only) - for single school
const getSingleSchool= async (req, res, next) => {
  try {
    const schoolId = req.params.id;
    const school = await Schools.findOne({ _id: schoolId });

    if (!school) {
      res.status(400).send({ message: "No school found with id " + schoolId });
    } else {
      res.status(200).json({
      _id: school._id,
      schoolName: school.schoolName,
      schoolAddress: school.schoolAddress,
      schoolPhone: school.schoolPhone
      });
    }
  } catch (err) {
    console.error("Error getting school with id:", err);
    res
      .status(500)
      .send({ message: "Error getting school with id " + schoolIdId });
  }
};

// POST Request Controllers (Create) - Create a school based on the mongoose model
const createSchool = async (req, res) => {
  try {
    // #swagger.description = 'Creating a single school in our database'

    const {
      schoolName,
      schoolAddress,
      schoolPhone
    } = req.body;

    const requiredFields = {
        schoolName,
        schoolAddress,
        schoolPhone
    };

    for (const field in requiredFields) {
      if (!requiredFields[field]) {
        return res.status(400).send({ message: `Please provide ${field}.` });
      }
    }

    const school = new Schools({
        schoolName,
        schoolAddress,
        schoolPhone
    });

    const savedSchool = await school.save();

    console.log(savedSchool);
    return res.status(201).send(savedSchool);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occurred while creating a school.",
    });
  }
};

// PUT Request Controllers (Create) - Update a school based on the mongoose model
const updateSchool = async (req, res) => {
  try {
    // #swagger.description = 'Updating a single school in our database'

    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid school id to update a school");
    }

    const schoolId = req.params.id;
    const schoolData = {
      schoolName: req.body.schoolName,
      schoolAddress: req.body.schoolAddress,
      schoolPhone: req.body.schoolPhone
    };

    // Check for missing fields in the updated school data
    const requiredFields = [
      "schoolName",
      "schoolAddress",
      "schoolPhone"
    ];
    const missingFields = requiredFields.filter((field) => !schoolDataData[field]);

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).send({ error: "Bad Request - " + errorMessage });
    }

    const updatedSchool = await Schools.findByIdAndUpdate(
      schoolId,
      schoolData,
      {
        new: true,
      }
    );

    if (!updatedSchool) {
      return res
        .status(404)
        .send({ message: "No school found with id " + schoolId });
    }

    return res.status(204).json(updatedSchool);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error updating school: " + err.message });
  }
};

// DELETE Request Controllers (Create) - Delete a school based on the mongoose model
const deleteSchool = async (req, res) => {
  try {
    // #swagger.description = 'Deleting a single school from our database'

    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid school id to delete a school");
    }

    const schoolId = req.params.id;

    const data = await Schools.deleteOne({ _id: schoolId });

    if (data.deletedCount > 0) {
      return res.status(200).send();
    } else {
      return res
        .status(500)
        .json("Some error occurred while deleting the school.");
    }
  } catch (error) {
    return res
      .status(500)
      .json("An error occurred while processing your request.");
  }
};

module.exports = {
  getSchools,
  getSingleSchool,
  createSchool,
  updateSchool,
  deleteSchool
};