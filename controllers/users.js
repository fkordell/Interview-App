const { ObjectId } = require("mongodb");
const db = require("../models");
const Users = db.users;
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../datavalidate/hashPasswordValidate");

// GET Request Controllers (Read only) - for all users
const getUsers = async (req, res, next) => {
  try {
    // Assuming you have a model named Users for user data
    const users = await Users.find({});
    // Formatting the data before sending it as response
    const formattedUsers = users.map((user) => ({
      _id: user._id,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
      userPassword: user.userPassword,
    }));
    // Setting response header and sending the formatted data
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(formattedUsers);
  } catch (err) {
    // Handling errors if any occurred during the process
    console.error("Error occurred while getting users:", err);
    res.status(500).json({ message: "An error occurred while getting users." });
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
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userEmail: user.userEmail,
        userPassword: user.userPassword,
      });
    }
  } catch (err) {
    console.error("Error getting user with id:", err);
    res.status(500).send({ message: "Error getting user with id " + userId });
  }
};

// POST Request Controllers (Create) - Create a user based on the mongoose model
const createUser = async (req, res) => {
  try {
    // #swagger.description = 'Creating an account in our database'

    let hashedPassword;

    // Validate password complexity
    const passwordValidation = hashPassword(req.body.userPassword);
    if (passwordValidation.error) {
      const missingRequirements = passwordValidation.error.details.map(
        (detail) => detail.message
      );
      return res.status(400).json({
        message: `Password does not meet complexity requirements. Missing requirements: ${missingRequirements.join(", ")}`,
      });
    }

    // Hash password
    hashedPassword = await bcrypt.hashSync(req.body.userPassword, 10);

    const user = new Users({
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      userEmail: req.body.userEmail,
      userPassword: hashedPassword,
    });

    const savedUser = await user.save();

    console.log(savedUser);
    return res.status(201).send(savedUser);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating user.",
    });
  }
};

// PUT Request Controllers (Create) - Update a user based on the mongoose model
const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid user id to update a user");
    }

    const userId = req.params.id;
    const { userFirstName, userLastName, userEmail, userPassword } = req.body;

    // Check for missing fields in the updated user data
    const requiredFields = ["userFirstName", "userLastName", "userEmail"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).json({ error: "Bad Request - " + errorMessage });
    }

    // Validate password complexity
    if (userPassword) {
      const passwordValidation = hashPassword(userPassword);
      if (passwordValidation.error) {
        const missingRequirements = passwordValidation.error.details.map(
          (detail) => `- ${detail.message}`
        );
        const errorMessage = `Password does not meet complexity requirements. Missing requirements: ${missingRequirements.join(", ")}`;
        return res.status(400).json({ error: errorMessage });
      }
    }

    // Hash password if provided
    let hashedPassword;
    if (userPassword) {
      hashedPassword = await bcrypt.hashSync(userPassword, 10);
    }

    // Update user data
    const updatedUserData = { userFirstName, userLastName, userEmail };
    if (hashedPassword) {
      updatedUserData.userPassword = hashedPassword;
    }

    // Update user
    const updatedUser = await Users.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "No user found with id " + userId });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating user: " + error.message,
    });
  }
};

// DELETE Request Controllers (Create) - Delete a user based on the mongoose model
const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid user id for deletion." });
    }

    const userId = req.params.id;

    // Fetch the user before deletion to get the user details
    const userToDelete = await Users.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ error: "No user found with id " + userId });
    }

    // Get any relevant details of the user, if needed
    const { userFirstName, userLastName } = userToDelete;

    // Delete the user
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "No user found with id " + userId });
    }

    return res.status(200).json({
      message: `User: *${userFirstName} ${userLastName}* was successfully deleted.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
