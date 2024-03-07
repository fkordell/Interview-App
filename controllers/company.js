const { ObjectId } = require("mongodb");
const db = require("../models");
const company = db.company;

// GET Request Controllers (Read only) - for all companies
const getCompanies = async (req, res, next) => {
    // 'Getting all companies from the mongo database'
    company.find({})
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



  module.exports = {
    getCompanies,
  };
  