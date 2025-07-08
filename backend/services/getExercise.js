const mongoose = require('mongoose');
const UserPreference = require('../models/UserPreference');
const Exercise = require('../models/Exercise'); 

const getUserPreferences = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid userId format');
    }

    const preferences = await UserPreference.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    }).lean();

    if (!preferences) {
      throw new Error(`Preferences not found for user with ID: ${userId}`);
    }

    return preferences;
  } catch (error) {
    console.error(`Error fetching user preferences: ${error.message}`);
    throw error;
  }
};

const getExercisePool = async (userPrefs) => {
  try {
    const {
      preferredTypes,
      preferredBodyParts,
      preferredEquipments,
      preferredLevel,
      minRating,
      dislikedTypes,
      dislikedEquipments
    } = userPrefs;

    const filter = {
      ...(preferredTypes?.length || dislikedTypes?.length
        ? {
            type: {
              ...(preferredTypes?.length ? { $in: preferredTypes } : {}),
              ...(dislikedTypes?.length ? { $nin: dislikedTypes } : {})
            }
          }
        : {}),
    
      ...(preferredBodyParts?.length && {
        bodyPart: { $in: preferredBodyParts }
      }),
    
      ...(preferredEquipments?.length || dislikedEquipments?.length
        ? {
            equipment: {
              ...(preferredEquipments?.length ? { $in: preferredEquipments } : {}),
              ...(dislikedEquipments?.length ? { $nin: dislikedEquipments } : {})
            }
          }
        : {}),
    
      ...(preferredLevel && {
        level: preferredLevel
      }),
    
      ...(typeof minRating === 'number' && !isNaN(minRating) && {
        rating: { $gte: minRating }
      })
    };

    const exercises = await Exercise.find(filter).lean();
 
    return exercises;
  } catch (error) {
    console.error(`Error fetching exercise pool: ${error.message}`);
    throw error;
  }
};

const getFilteredExercisesForUser = async (userId) => {
  try {
    const preferences = await getUserPreferences(userId);
    const exercises = await getExercisePool(preferences);
    return exercises;
  } catch (error) {
    console.error(`Error fetching filtered exercises for user: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getFilteredExercisesForUser
};
