const router = require("express").Router();
const Workout = require("../models/Workout");
const path = require("path");
const Exercise = require("../models/Exercise");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .populate('exercises')
        .sort({ date: -1 })
        .then(dbWorkout => {
            //console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
router.post("/api/workouts", ({ body }, res) => {
    Workout.create({body})
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err)
            res.json(err);
        });
});
router.put("/api/workouts/:id", ({ body, params}, res) => {
    Exercise.create(body)
        .then(({ _id }) => Workout.findOneAndUpdate({_id: params.id}, { $push: { exercises: _id } }, { new: true }))
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
        .catch(err => res.json({err}));
});
router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});
router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .populate('exercises')
        .sort({ date: -1 })
        .then(dbWorkout => {
            //console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
module.exports = router;