const Preference = require('../models/UserPreference');

exports.createPreference = async (req, res) => {
    try {
      const {
        userId,
        preferredTypes,
        preferredBodyParts,
        preferredEquipments,
        preferredLevel,
        minRating,
        dislikedTypes,
        dislikedEquipments
      } = req.body;
  
      if (!userId || !preferredLevel) {
        return res.status(400).json({ error: 'userId and preferredLevel are required' });
      }
  
      const updatedPref = await Preference.findOneAndUpdate(
        { userId },
        {
          $set: {
            preferredTypes,
            preferredBodyParts,
            preferredEquipments,
            preferredLevel,
            minRating: minRating ?? 0,
            dislikedTypes,
            dislikedEquipments,
            createdAt: new Date()
          }
        },
        { upsert: true, new: true }
      );
  
      res.json({
        message: 'Preferences saved or updated successfully',
        savedData: updatedPref
      });
  
    } catch (error) {
      console.error('Error saving preferences:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  