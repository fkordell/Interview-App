const express = require('express');
const router = express.Router();
const interviewsController = require('../controllers/interviews');

//Get a list of all interviews
router.get('/', interviewsController.getInterviews);
//Get a single interview by its ID
router.get('/:id', interviewsController.getInterviewById);
//Create a new interview
router.post('/', interviewsController.createInterview);
//Update an interview 
router.put('/:id', interviewsController.updateInterview);
//Delete an interview
router.delete('/:id', interviewsController.deleteInterview);

module.exports = router;