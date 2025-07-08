const { getFilteredExercisesForUser } = require('./getExercise'); 
const allExercises = getFilteredExercisesForUser();

console.log('All exercises:', allExercises); // log the fetched exercises
const numberOfDays = preference.NumberOfDays 

const muscleGroupMap = {
    Push: ['Chest', 'Shoulders', 'Triceps'],
    Pull: ['Back', 'Biceps'],
    Legs: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes'],
    Upper: ['Chest', 'Shoulders', 'Triceps', 'Back', 'Biceps'],
    Lower: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes'],
    FullBody: ['Chest', 'Shoulders', 'Triceps', 'Back', 'Biceps', 'Quadriceps', 'Hamstrings', 'Calves', 'Glutes']
};  

const splitPlan = {
    2: ['Upper', 'Lower'],
    3: ['Push', 'Pull', 'Legs'],
    4: ['Push', 'Pull', 'Legs', 'Full Body'],
    5: ['Push', 'Pull', 'Legs', 'Upper', 'Lower'],
    6: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
    7: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs', 'Full Body'],
}

const splitType = splitPlan[numberOfDays];
if (!splitType) {
    throw new Error(`Invalid number of days: ${numberOfDays}. Please provide a valid number.`);
}

function filterExercisesForDay(allExercises, splitType) {
    const exercisesForDay = {};
    
    splitType.forEach(type => {
        exercisesForDay[type] = allExercises.filter(exercise => 
            muscleGroupMap[type].some(muscle => exercise.bodyPart.includes(muscle))
        );
    });

    return exercisesForDay;
}

const dailyWorkoutPlan = filterExercisesForDay(allExercises, splitType);
console.log('Daily workout plan:', dailyWorkoutPlan);

module.exports = {
    filterExercisesForDay
};