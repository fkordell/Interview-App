const { ObjectId } = require("mongodb");
const db = require("../models");
const Companies = db.companies;

// GET Request Controllers (Read only) - for all companies
const getCompanies = async (req, res, next) => {
  // 'Getting all companies from the mongo database'
  Companies.find({})
    .then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    })
    .catch((err) => {
      //For error handling
      res.status(500).send({
        message: err.message || "An error occurred while getting companies.",
      });
    });
};

// GET Request Controllers (Read only) - for single company
const getSingleCompany = async (req, res, next) => {
  // 'Getting single comapny from the mongo database'

  const userId = req.params.id;
  Companies.findOne({ _id: userId })
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No company found with id " + userId });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error getting company with id " + userId,
      });
    });
};

// POST Request Controllers (Create) - Create a company based on the mongoose model
const createCompany = async (req, res) => {
  try {
    // #swagger.description = 'Creating a single company in our database'

    const {
      companyName,
      companyDescription,
      industryCategory,
      location,
      contactInfo,
      websiteURL,
    } = req.body;

    // Destructuring nested location fields
    const { address, city, state, country } = location;
    // Destructuring nested contactInfo fields
    const { firstName, lastName, email, favoriteColor, birthday } = contactInfo;

    const requiredFields = {
      companyName,
      companyDescription,
      industryCategory,
      address,
      city,
      state,
      country,
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
      websiteURL,
    };

    for (const field in requiredFields) {
      if (!requiredFields[field]) {
        return res.status(400).send({ message: `Please provide ${field}.` });
      }
    }

    const company = new Companies({
      companyName,
      companyDescription,
      industryCategory,
      location: { address, city, state, country }, // Assign nested location fields
      contactInfo: { firstName, lastName, email, favoriteColor, birthday }, // Assign nested contactInfo fields
      websiteURL,
    });

    const data = await company.save();
    console.log(data);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occurred while creating a company.",
    });
  }
};

// PUT Request Controllers (Create) - Update a company based on the mongoose model
const updateCompany = async (req, res) => {
  try {
    // #swagger.description = 'Updating a single company in our database'

    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid company id to update a company");
    }

    const companyId = req.params.id;
    const company = {
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      industryCategory: req.body.industryCategory,
      location: req.body.location,
      contactInfo: req.body.contactInfo,
      websiteURL: req.body.websiteURL,
    };

    // Check for missing fields in the updated company data
    const requiredFields = [
      "companyName",
      "companyDescription",
      "industryCategory",
      "location",
      "contactInfo",
      "websiteURL",
    ];
    const missingFields = requiredFields.filter((field) => !company[field]);

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).send({ error: "Bad Request - " + errorMessage });
    }

    const Company = req.models.Company; // Assuming you've set up models properly

    const response = await Companies.findByIdAndUpdate(companyId, company, {
      new: true,
    });

    if (!response) {
      return res
        .status(404)
        .send({ message: "No company found with id " + companyId });
    }

    return res.status(204).json(response);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error updating company: " + err.message });
  }
};

// DELETE Request Controllers (Create) - Delete a company based on the mongoose model
const deleteCompany = async (req, res) => {
  try {
    // #swagger.description = 'Deleting a single company from our database'
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid company id to delete a company");
    }

    const companyId = req.params.id;

    const Company = req.models.Company; // Assuming you've set up models properly

    const data = await Company.deleteOne({ _id: companyId });

    if (data.deletedCount > 0) {
      return res.status(200).send();
    } else {
      return res
        .status(500)
        .json("Some error occurred while deleting the company.");
    }
  } catch (error) {
    return res
      .status(500)
      .json("An error occurred while processing your request.");
  }
};

module.exports = {
  getCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
