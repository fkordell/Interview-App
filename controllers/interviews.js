const { ObjectId } = require("mongodb");
const db = require("../models");
const Interview = db.interviews;

const getInterviews = async (req, res, next) => {
    try {
        const interviews = await Interview.find({});
        const formattedInterviews = interviews.map((interview) => ({
            _id: interview._id,
            companyName: interview.companyName,
            position: interview.position,
            location: interview.location,
            date: interview.date,
            time: interview.time,
        }));
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(formattedInterviews);
    } catch (err) {
        console.error("Error ocurred while getting interviews.", err);
        res.status(500).json({ message: "Error fetching interviews"});
    }
};

const getInterviewById = async (req, res, next) => {
    try {
        const interviewId = req.params.id;
        const interview = await Interview.findOne({ _id: interviewId});
        if (!interview) {
            res.status(404).send({ message: 'Interview not found'});
        } else {
            res.status(200).json({
                _id: interview._id,
                companyName: interview.companyName,
                position: interview.position,
                location: interview.location,
                date: interview.date,
                time: interview.time,
            });
        }
    } catch (err) {
        console.error('Error getting interview with id:', err);
        res.status(500).send({ message: 'Error fetching interview',});
    }
};

const createInterview = async (req, res) => {
    try {
        //#swagger.description = 'Creating a single interview in our database

        const {
            companyName, 
            position,
            location, 
            date,
            time
        } = req.body;

        const requiredFields ={
            companyName,
            position,
            location, 
            date, 
            time
        }

        for (const field in requiredFields) {
            if (!requiredFields[field]) {
              return res.status(400).send({ message: `Please provide ${field}.` });
            }
          }

        const interview = new Interview({
           companyName,
           position,
           location,
           date, 
           time
        });
        
        const savedInterview = await interview.save();

        console.log(savedInterview);
        return res.status(201).send(savedInterview);
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Error occurred while creating a interview.",
          });
    }
}

const updateInterview = async (req, res) => {
    try {
        // #swagger.description = 'Updating a single interview in our database'
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json("Must use a valid interview id to update a school");
        }
        const interviewId = req.params.id;
        const interviewData = {
          companyName: req.body.companyName,
          position: req.body.position,
          location: req.body.location,
          date: req.body.date,
          time: req.body.time
        };

        const requiredFields = [
            "companyName",
            "position",
            "location",
            "date",
            "time"
          ];
          const missingFields = requiredFields.filter((field) => !interviewData[field]);

          if (missingFields.length > 0) {
            const errorMessage = `Missing data: ${missingFields.join(", ")}`;
            return res.status(400).send({ error: "Bad Request - " + errorMessage });
          }

          const updatedInterview = await Companies.findByIdAndUpdate(
            companyId,
            companyData,
            {
              new: true,
            }
          );

          if (!updatedInterview) {
            return res.status(404).send({ message: "No company found with id " + interviewId });
          }
    } catch  (err) {
        return res.status(500).send({ message: "Error updating company: " + err.message });
    }
};

const deleteInterview = async (req, res) => {
    try {
      // #swagger.description = 'Deleting a single interview from our database'
  
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Must use a valid interview id to delete a company");
      }
  
      const interviewId = req.params.id;
  
      const data = await Interview.deleteOne({ _id: interviewId });
  
      if (data.deletedCount > 0) {
        return res.status(200).send();
      } else {
        return res.status(500).json("Some error occurred while deleting the interview.");
      }
    } catch (error) {
      return res.status(500).json("An error occurred while processing your request.");
    }
  };

module.exports = {getInterviews, getInterviewById, createInterview, updateInterview, deleteInterview }