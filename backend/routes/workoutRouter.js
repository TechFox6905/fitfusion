const express = require('express');
const router = express.Router();
const { createPreference } = require('../controllers/preferenceController');
const { getFilteredWorkoutsController } = require('../controllers/workoutController');

router.post('/preferences', createPreference);
router.get('/personalized/:userId', getFilteredWorkoutsController);
  
module.exports = router;