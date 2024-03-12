const { ObjectId } = require("mongodb");
const db = require("../models");
const Users = db.user;

// GET Request Controllers (Read only) - for all users
const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});
    const formattedUsers = users.map((user) => ({
      _id: user._id,
      userFirstName: user.userFirstNameName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
      userPassword: user.userPassword,
    }));
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(formattedUsers);
  } catch (err) {
    console.error("Error occurred while getting users:", err);
    res
      .status(500)
      .json({ message: "An error occurred while getting users." });
  }
};

// GET Request Controllers (Read only) - for single user
const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await Users.findOne({ _id: userId });

    if (!user) {
      res.status(400).send({ message: "No user found with id " + userId });
    } else {
      res.status(200).json({
      _id: user._id,
      userFirstName: user.userFirstNameName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      });
    }
  } catch (err) {
    console.error("Error getting user with id:", err);
    res
      .status(500)
      .send({ message: "Error getting user with id " + userId });
  }
};

// POST Request Controllers (Create) - Create a user based on the mongoose model
const createUser = async (req, res) => {
  try {
    // #swagger.description = 'Creating a single user in our database'

    const {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    } = req.body;

    const requiredFields = {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    };

    for (const field in requiredFields) {
      if (!requiredFields[field]) {
        return res.status(400).send({ message: `Please provide ${field}.` });
      }
    }

    const user = new Users({
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    });

    const savedUser = await user.save();

    console.log(savedUser);
    return res.status(201).send(savedUser);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occurred while creating a user.",
    });
  }
};

// PUT Request Controllers (Create) - Update a user based on the mongoose model
const updateUser = async (req, res) => {
  try {
    // #swagger.description = 'Updating a single user in our database'

    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid user id to update a user");
    }

    const userId = req.params.id;
    const userData = {
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      userEmail: req.body.userEmail,
      userPassword: req.body.userPassword,
    };

    // Check for missing fields in the updated user data
    const requiredFields = [
      "userFirstName",
      "userLastName",
      "userEmail",
      "userPassword",
    ];
    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).send({ error: "Bad Request - " + errorMessage });
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      userData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: "No user found with id " + userId });
    }

    return res.status(204).json(updatedUser);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error updating user: " + err.message });
  }
};

// DELETE Request Controllers (Create) - Delete a user based on the mongoose model
const deleteUser = async (req, res) => {
  try {
    // #swagger.description = 'Deleting a single user from our database'

    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid user id to delete a user");
    }

    const userId = req.params.id;

    const data = await Users.deleteOne({ _id: userId });

    if (data.deletedCount > 0) {
      return res.status(200).send();
    } else {
      return res
        .status(500)
        .json("Some error occurred while deleting the user.");
    }
  } catch (error) {
    return res
      .status(500)
      .json("An error occurred while processing your request.");
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};