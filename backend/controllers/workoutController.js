const { getFilteredExercisesForUser } = require('../services/workoutService'); // or wherever your service is

const getFilteredWorkoutsController = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId || userId.length !== 24) {
        return res.status(400).json({ error: 'Invalid userId' });
      }
  
      const workouts = await getFilteredExercisesForUser(userId);
      console.log('Filtered workouts:', workouts); // log the filtered workouts
      res.status(200).json(workouts);
    } catch (error) {
      console.error('Controller error:', error); // log full error stack
      res.status(500).json({ error: error.message || 'Server error' }); // show real error in Postman
    }
  };

  module.exports = {
    getFilteredWorkoutsController
  };