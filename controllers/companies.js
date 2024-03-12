const { ObjectId } = require("mongodb");
const db = require("../models");
const Companies = db.companies;

// GET Request Controllers (Read only) - for all companies
const getCompanies = async (req, res, next) => {
  try {
    const companies = await Companies.find({});
    const formattedCompanies = companies.map((company) => ({
      _id: company._id,
      companyName: company.companyName,
      companyDescription: company.companyDescription,
      industryCategory: company.industryCategory,
      location: company.location,
      contactInfo: company.contactInfo,
      websiteURL: company.websiteURL,
    }));
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(formattedCompanies);
  } catch (err) {
    console.error("Error occurred while getting companies:", err);
    res
      .status(500)
      .json({ message: "An error occurred while getting companies." });
  }
};

// GET Request Controllers (Read only) - for single company
const getSingleCompany = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const company = await Companies.findOne({ _id: userId });

    if (!company) {
      res.status(400).send({ message: "No company found with id " + userId });
    } else {
      res.status(200).json({
        _id: company._id,
        companyName: company.companyName,
        companyDescription: company.companyDescription,
        industryCategory: company.industryCategory,
        location: company.location,
        contactInfo: company.contactInfo,
        websiteURL: company.websiteURL,
      });
    }
  } catch (err) {
    console.error("Error getting company with id:", err);
    res
      .status(500)
      .send({ message: "Error getting company with id " + userId });
  }
};

// POST Request Controllers (Create) - Create a company based on the mongoose model
const createCompany = async (req, res) => {
  try {
    // #swagger.description = 'Creating a single company in our database'

    const {
      companyName,
      companyDescription,
      industryCategory,
      location: { address, city, state, country },
      contactInfo: { firstName, lastName, email, favoriteColor, birthday },
      websiteURL,
    } = req.body;

    const requiredFields = {
      companyName,
      companyDescription,
      industryCategory,
      location: { address, city, state, country },
      contactInfo: { firstName, lastName, email, favoriteColor, birthday },
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
      location: { address, city, state, country },
      contactInfo: { firstName, lastName, email, favoriteColor, birthday },
      websiteURL,
    });

    const savedCompany = await company.save();

    console.log(savedCompany);
    return res.status(201).send(savedCompany);
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
    const companyData = {
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
    const missingFields = requiredFields.filter((field) => !companyData[field]);

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).send({ error: "Bad Request - " + errorMessage });
    }

    const updatedCompany = await Companies.findByIdAndUpdate(
      companyId,
      companyData,
      {
        new: true,
      }
    );

    if (!updatedCompany) {
      return res
        .status(404)
        .send({ message: "No company found with id " + companyId });
    }

    return res.status(204).json(updatedCompany);
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

    const data = await Companies.deleteOne({ _id: companyId });

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
