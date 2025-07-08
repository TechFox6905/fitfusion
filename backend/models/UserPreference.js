const mongoose = require('mongoose');

const UserPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  preferredTypes: [{
    type: String,
    enum: [
      'Cardio',
      'Olympic Weightlifting',
      'Plyometrics',
      'Powerlifting',
      'Strength',
      'Stretching',
      'Strongman'
    ]
  }],
  preferredBodyParts: [{
    type: String,
    enum: [
      'Abdominals', 'Abductors',
      'Adductors',  'Biceps',
      'Calves',     'Chest',
      'Forearms',   'Glutes',
      'Hamstrings', 'Lats',
      'Lower Back', 'Middle Back',
      'Neck',       'Quadriceps',
      'Shoulders',  'Traps',
      'Triceps'
    ]
  }],
  preferredEquipments: [{
    type: String,
    enum: [
      'Bands',         'Barbell',
      'Body Only',     'Cable',
      'Dumbbell',      'E-Z Curl Bar',
      'Exercise Ball', 'Foam Roll',
      'Kettlebells',   'Machine',
      'Medicine Ball', 'None',
      'Other'
    ]
  }],
  preferredLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate']
  },
  minRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  dislikedTypes: [{
    type: String,
    enum: [
      'Cardio',
      'Olympic Weightlifting',
      'Plyometrics',
      'Powerlifting',
      'Strength',
      'Stretching',
      'Strongman'
    ]
  }],
  dislikedEquipments: [{
    type: String,
    enum: [
      'Bands', 'Barbell', 'Body Only', 'Cable', 'Dumbbell', 'E-Z Curl Bar',
      'Exercise Ball', 'Foam Roll', 'Kettlebells', 'Machine', 'Medicine Ball', 'None', 'Other'
    ]
  }],
  AvaliableDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  NumberOfDays: {
    type: Number,
    min: 2,
    max: 7,
    default: 4
  },
});

module.exports = mongoose.model('UserPreference', UserPreferenceSchema);