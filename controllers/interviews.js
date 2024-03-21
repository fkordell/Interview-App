const { ObjectId } = require("mongodb");
const db = require("../models");
const Interviews = db.interviews;

const getInterviews = async (req, res, next) => {
  try {
    // Assuming you have a model named Interviews for interviews data
    const interviews = await Interviews.find({});
    // Formatting the data before sending it as response
    const formattedInterviews = interviews.map((interview) => ({
      _id: interview._id,
      interviewer: interview.interviewer,
      position: interview.position,
      location: interview.location,
      date: interview.date,
      time: interview.time,
    }));
    // Setting response header and sending the formatted data
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(formattedInterviews);
  } catch (err) {
    // Handling errors if any occurred during the process
    console.error("Error occurred while getting interviews:", err);
    res
      .status(500)
      .json({ message: "An error occurred while getting interviews." });
  }
};

const getSingleInterview = async (req, res, next) => {
  try {
    const interviewId = req.params.id;
    const interview = await Interviews.findOne({ _id: interviewId });

    if (!interview) {
      res
        .status(400)
        .send({ message: "No interview found with id " + interviewId });
    } else {
      res.status(200).json({
        _id: interview._id,
        interviewer: interview.interviewer,
        position: interview.position,
        location: interview.location,
        date: interview.date,
        time: interview.time,
      });
    }
  } catch (err) {
    console.error("Error getting interview with id:", err);
    res
      .status(500)
      .send({ message: "Error getting interview with id " + interviewId });
  }
};

const createInterview = async (req, res) => {
  try {
    // #swagger.description = 'Creating a single interview in our database'

    const { interviewer, position, location, date, time } = req.body;

    const requiredFields = {
      interviewer,
      position,
      location,
      date,
      time,
    };

    for (const field in requiredFields) {
      if (!requiredFields[field]) {
        return res.status(400).send({ message: `Please provide ${field}.` });
      }
    }

    const interview = new Interviews({
      interviewer,
      position,
      location,
      date,
      time,
    });

    const savedInterview = await interview.save();

    console.log(savedInterview);
    return res.status(201).send(savedInterview);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error occurred while creating an interview.",
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    // #swagger.description = 'Updating a single interview in our database'

    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid interview id to update an interview");
    }

    const interviewId = req.params.id;
    const interviewData = {
      interviewer: req.body.interviewer,
      position: req.body.position,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
    };

    // Check for missing fields in the updated interview data
    const requiredFields = [
      "interviewer",
      "position",
      "location",
      "date",
      "time",
    ];
    const missingFields = requiredFields.filter(
      (field) => !interviewData[field]
    );

    if (missingFields.length > 0) {
      const errorMessage = `Missing data: ${missingFields.join(", ")}`;
      return res.status(400).send({ error: "Bad Request - " + errorMessage });
    }

    const updatedInterview = await Interviews.findByIdAndUpdate(
      interviewId,
      interviewData,
      {
        new: true,
      }
    );

    if (!updatedInterview) {
      return res
        .status(404)
        .send({ message: "No interview found with id " + interviewId });
    }

    // Returning 200 instead of 204 to include a response message
    return res
      .status(200)
      .json({ message: "Interview updated successfully.", interviewData });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error updating interview: " + err.message });
  }
};

const deleteInterview = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid interview id for deletion." });
    }

    const interviewId = req.params.id;

    // Fetch the interview before deletion to get the interview details
    const interviewToDelete = await Interviews.findById(interviewId);

    if (!interviewToDelete) {
      return res
        .status(404)
        .json({ error: "No interview found with id " + interviewId });
    }

    // Get any relevant details of the interview, if needed
    const { interviewer } = interviewToDelete;

    // Delete the interview
    const deletedInterview = await Interviews.findByIdAndDelete(interviewId);

    if (!deletedInterview) {
      return res
        .status(404)
        .json({ error: "No interview found with id " + interviewId });
    }

    return res.status(200).json({
      message: `Interviewer: *${interviewer}* was successfully deleted.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the interview." });
  }
};

module.exports = {
  getInterviews,
  getSingleInterview,
  createInterview,
  updateInterview,
  deleteInterview,
};
