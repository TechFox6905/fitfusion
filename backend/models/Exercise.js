const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  exerciseId: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String
  },
  type: {
    type: String,
    enum: [
      'Cardio',
      'Olympic Weightlifting',
      'Plyometrics',
      'Powerlifting',
      'Strength',
      'Stretching',
      'Strongman'
    ], 
    required: true,
  },
  bodyPart: {
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
    ],
    required: true,
  },
  equipment: {
    type: String,
    enum: [
      'Bands',         'Barbell',
      'Body Only',     'Cable',
      'Dumbbell',      'E-Z Curl Bar',
      'Exercise Ball', 'Foam Roll',
      'Kettlebells',   'Machine',
      'Medicine Ball', 'None',
      'Other'
    ],
    required: true,
  },
  level: {
    type: String,
    enum: [ 'Beginner', 'Intermediate' ],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  ratingDesc: {
    type: String,
    default: '',
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema, "exercises");

module.exports = Exercise;