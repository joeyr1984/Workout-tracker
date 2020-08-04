const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
}, {
    toObject: { virtuals: true },

    toJSON: { virtuals: true }
});

WorkoutSchema.virtual('totalDuration').get(function () {
    return this.exercises.map(exe => exe.duration).reduce((prev, next) => prev + next, 0);
})
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;