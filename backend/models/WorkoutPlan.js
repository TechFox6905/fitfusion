const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    week: {
        type: Number,
        required: true
    },
    plan: [
        {
            day: {
                type: String,
                required: true
            },
            workouts: {
                type: [String],
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WorkoutPlan = mongoose.models.WorkoutPlan || mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;